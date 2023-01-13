<?php

namespace App\Controller\Stripe;

use App\Controller\Easypost\ShippingController;
use App\Entity\Sku;
use App\Entity\Order;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

class CheckoutStripeController extends AbstractController{
    #[Route('/api/clientsecret', name: 'clientsecret', methods: ['POST'])]
    public function getClientSecret(){    
        \Stripe\Stripe::setApiKey($_SERVER['STRIPE_PRIVATE_KEY']);

        try {
            // retrieve JSON from POST body
            $jsonStr = file_get_contents('php://input');
            $jsonObj = json_decode($jsonStr);

            $setupIntent = \Stripe\SetupIntent::create([
                'payment_method_types' => ['card'],
            ]);

            $output = [
                'clientSecret' => $setupIntent->client_secret,
            ];

            return new JsonResponse(json_encode($output));
        } catch (Error $e) {
            http_response_code(500);
            return new JsonResponse(json_encode(['error' => $e->getMessage()]));
        }
    }
    
    #[Route('/api/checkout', name: 'checkout', methods: ['POST'])]
    public function getCustomerName(ManagerRegistry $doctrine) {
        $stripe = new \Stripe\StripeClient($_SERVER['STRIPE_PRIVATE_KEY']);
        $entityManager = $doctrine->getManager();

        try {
            // retrieve JSON from POST body
            $session_id = file_get_contents('php://input');

            $session = $stripe->checkout->sessions->retrieve($session_id);
            $rate = $stripe->shippingRates->retrieve(
                $session->shipping_cost->shipping_rate,
                []
            );
            $selected_rate_id = $rate->metadata->id;
            $shipment = ShippingController::retrieveShipping($session->metadata->shipping);
            $line_items = $stripe->checkout->sessions->allLineItems($session_id);
            $order = $entityManager
                        ->getRepository(Order::class)
                        ->find($session->client_reference_id);
            
            //we buy the selected rate for shipping
            if ($order->getStatus() === "CART"){
                foreach ($shipment->rates as $rate){
                    if ($rate->id === $selected_rate_id){
                        $shipment->buy([
                            'rate' => $rate,
                        ]);
                    }
                }
                foreach ($line_items->data as $item){           
                    //update stock when order is validated
                    $product = $stripe->products->retrieve($item->price->product, []);
                    $sku_reference = $product->metadata->reference;
                    $sku = $entityManager
                        ->getRepository(Sku::class)
                        ->findOneBy(["referenceNumber" => $sku_reference]);
                    $sku->setStock($sku->getStock() - 1);
                    $entityManager->persist($sku);
                    $entityManager->flush();
                }
                //create a fake tracker for shipment
                $tracker = \EasyPost\Tracker::create([
                    'tracking_code' => "EZ1000000001",
                    'carrier' => $shipment->selected_rate->carrier
                ]);
                $order->setStatus("COMPLETED");
                $order->setIdEasypostTracking($tracker->id);
                $entityManager->persist($order);
                $entityManager->flush();
            }

            if ($session->customer_details){
                return new JsonResponse(json_encode(["name" => $session->customer_details->name]));
            }
            return new JsonResponse(json_encode(["cancel" => true]));
        } catch (Error $e) {
            http_response_code(500);
            return json_encode(['error' => $e->getMessage()]);
        }
    }

}