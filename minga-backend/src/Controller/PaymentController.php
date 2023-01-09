<?php

namespace App\Controller;

use App\Controller\ShippingController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

function calculateOrderAmount(array $items): int {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    $totalAmount = 0;
    foreach ($items as $item) {
        $totalAmount += $item->price;
    }
    //stripe takes the amout starting from penny
    return $totalAmount;
}

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

class PaymentController{

    #[Route('/api/pay', name: 'create', methods: ['POST'])]
    public function pay(){
        \Stripe\Stripe::setApiKey($_SERVER['STRIPE_PRIVATE_KEY']);

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
            $cart = json_decode($jsonObj->cart);
            $lineItems = getLineItems($cart);

        
            //if order is over 1000 euros, the shipping is free
            if (calculateOrderAmount($cart) > 1000){
                $standard_shipping = "shr_1MM71ZKpRc4HZ65yLFYDJwQo";
            }
            $customer = $jsonObj->customerInfos;
            $stripe = new \Stripe\StripeClient($_SERVER['STRIPE_PRIVATE_KEY']);

            if (isset($jsonObj->id)){
                $stripe_customer = $stripe->customers->search([
                    'query' => 'metadata[\'id\']:\''.$jsonObj->id.'\'',
                ]);
            }

            if (isset($stripe_customer) && count($stripe_customer->data) === 0){
                $stripe_customer = $stripe->customers->create([     
                    'name' => $customer->infos->name,
                    'address' => [
                        'city' => $customer->infos->address->city,
                        'country' => $customer->infos->address->country,
                        'line1' => $customer->infos->address->line1,
                        'line2' => $customer->infos->address->line2,
                        'postal_code' => $customer->infos->address->postal_code,
                        'state' => $customer->infos->address->state,
                    ],
                    'phone' => $customer->infos->phone,
                    'email' => $customer->email,    
                    'metadata' => ["id" => $jsonObj->id]
                ]);
            }

            if (!isset($stripe_customer)){
                $id = null;
            }
            else {
                $id = $stripe_customer->data[0]->id;
            }
            $checkout_session = \Stripe\Checkout\Session::create([
                'customer' => $id,
                'payment_method_types' => ['card'],
                'line_items' => $lineItems,
                'mode' => 'payment',
                'shipping_options' => $shipping_rates,
                'success_url' => "http://localhost:3000/order/success?session_id={CHECKOUT_SESSION_ID}",
                'cancel_url' => "http://localhost:3000/order/cancel?session_id={CHECKOUT_SESSION_ID}",
                'metadata' => ["shipping" => $shipping->id]
            ]);

            return new Response($checkout_session->url);
        } catch (Error $e) {
            http_response_code(500);
            return json_encode(['error' => $e->getMessage()]);
        }
    }

}