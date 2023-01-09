<?php

namespace App\Controller;

use App\Controller\ShippingController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class CheckoutStripeController{

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
    public function getCustomerName(){
        $stripe = new \Stripe\StripeClient($_SERVER['STRIPE_PRIVATE_KEY']);

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

            if (!isset($shipment->selected_rate)){
                foreach ($shipment->rates as $rate){
                    if ($rate->id === $selected_rate_id){
                        $shipment->buy([
                            'rate' => $rate,
                        ]);
                    }
                }
            }

            $tracker = \EasyPost\Tracker::create([
                'tracking_code' => "EZ1000000001",
                'carrier' => $shipment->selected_rate->carrier
            ]);
            dd($tracker);
            if ($session->shipping_details){
                return new JsonResponse(json_encode(["name" => $session->shipping_details->name]));
            }
            return new JsonResponse(json_encode(["cancel" => true]));
        } catch (Error $e) {
            http_response_code(500);
            return json_encode(['error' => $e->getMessage()]);
        }
    }

}