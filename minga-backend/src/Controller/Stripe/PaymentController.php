<?php

namespace App\Controller\Stripe;

use App\Controller\Easypost\ShippingController;
use App\Entity\Order;
use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

function getLineItems($items): array {
    $line_items = [];

    foreach ($items as $key => $item){
        array_push($line_items, [
                'price_data' =>
                [
                    'unit_amount' => $item->price * 100, 
                    'currency' => 'eur', 
                    'product_data' => [
                            'name' => $item->product->name,
                            'description' => $item->product->description,
                            'metadata' => ["reference" => $item->referenceNumber]
                        ]
                ],
                'quantity' => $item->amount,
            ]

        );
    }
    return $line_items;
}

function getShippingRates($rates){
    $shipping_rates = [];
    //stripe allows 5 shipping options max
    $len = count($rates) < 5 ? count($rates) : 5;
    for ($i = 0; $i < $len; $i++){
        array_push($shipping_rates, [
            'shipping_rate_data' => [
                'type' => 'fixed_amount',
                'fixed_amount' => ['amount' => round($rates[$i]->rate) * 100, 'currency' => 'eur'],
                'display_name' => $rates[$i]->carrier." : ". $rates[$i]->service . " Shipping",
                'delivery_estimate' => [
                    'minimum' => ['unit' => 'business_day', 'value' => $rates[$i]->delivery_days ? $rates[$i]->delivery_days : 14],
                    'maximum' => ['unit' => 'business_day', 'value' => $rates[$i]->delivery_days ? $rates[$i]->delivery_days + 5 : 21],
                ],
                'metadata' => ["id" => $rates[$i]->id]

            ],
        ]);
    }
    return $shipping_rates;
}

class PaymentController extends AbstractController{

    #[Route('/api/pay', name: 'create', methods: ['POST'])]
    public function pay(ManagerRegistry $doctrine){
        \Stripe\Stripe::setApiKey($_SERVER['STRIPE_PRIVATE_KEY']);
        $entityManager = $doctrine->getManager();

        try {
            // retrieve JSON from POST body
            $jsonStr = file_get_contents('php://input');
            $jsonObj = json_decode($jsonStr);

            $shipping = ShippingController::getShipping($jsonObj);
            //sort ascending by rates
            $rates = $shipping->rates;
            usort($rates, function($a, $b) {
                return $a->rate > $b->rate;
            });
            $shipping_rates = getShippingRates($rates);
            $cart = $jsonObj->cart;
            $lineItems = getLineItems($cart);

            $customer = $jsonObj->customerInfos;
            $stripe = new \Stripe\StripeClient($_SERVER['STRIPE_PRIVATE_KEY']);

            if (isset($jsonObj->id)){
                $stripe_customer = $stripe->customers->search([
                    'query' => 'metadata[\'id\']:\''.$jsonObj->id.'\'',
                ]);
            }
            if (isset($stripe_customer) && count($stripe_customer->data) === 0){
                $stripe_customer = $stripe->customers->create([     
                    'name' => $customer->name,
                    'address' => [
                        'line1' => $customer->address->street_number . " " . $customer->address->route,
                        'city' => $customer->address->locality,
                        'state' => $customer->address->administrative_area_level_1,
                        'postal_code' => $customer->address->postal_code,
                        'country' => $customer->address->country,
                    ],
                    'phone' => $customer->phone,
                    'email' => $customer->email,    
                    'metadata' => ["id" => $jsonObj->id]
                ]);
            }
            if (isset($jsonObj->id)){
                $user = $entityManager
                ->getRepository(User::class)
                ->find($jsonObj->id);
                $order = $entityManager
                ->getRepository(Order::class)
                ->findOneBy(["user" => $user, "status" => "CART"]);
            }
            $id = null;
            $email = $customer->email;
            //if is connected, we give id to the session
            if (isset($stripe_customer)){
                $id = $stripe_customer->data[0]->id;
                $email = null;
                if (isset($order) && !$order->getStripeCustomerId()){
                    $order->setStripeCustomerId($id);
                    $entityManager->persist($order);
                    $entityManager->flush();
                }
            }

            $checkout_session = \Stripe\Checkout\Session::create([
                'allow_promotion_codes' => true,
                'billing_address_collection' => 'required',
                'client_reference_id' => isset($order) ?  $order->getId() : $email,
                'customer' => $id,
                'customer_email' => $email,
                //automatically update address if it's needed
                'customer_update' => $id ? ["address" =>  "auto"] : null,
                'payment_method_types' => ['card'],
                //save card and adress information
                'payment_intent_data' => [
                    "setup_future_usage" => "on_session",
                    "shipping" => [
                        'address' => [
                            'line1' => $customer->address->street_number . " " . $customer->address->route,
                            'city' => $customer->address->locality,
                            'state' => $customer->address->administrative_area_level_1,
                            'postal_code' => $customer->address->postal_code,
                            'country' => $customer->address->country,
                        ],
                        'name' => $customer->name,
                    ]
                ],
                'line_items' => $lineItems,
                'mode' => 'payment',
                'shipping_options' => $shipping_rates,
                'success_url' => "http://localhost:3000/order/success?session_id={CHECKOUT_SESSION_ID}",
                'cancel_url' => "http://localhost:3000/order/cancel?session_id={CHECKOUT_SESSION_ID}",
                'phone_number_collection' => [
                    'enabled' => true,
                ],
                //we keeping easypost id shipping
                'metadata' => ["shipping" => $shipping->id],
            ]);

            return new Response($checkout_session->url);
        } catch (Error $e) {
            http_response_code(500);
            return json_encode(['error' => $e->getMessage()]);
        }
    }

}