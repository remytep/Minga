<?php

namespace App\Controller;

require 'vendor/autoload.php';
header('Content-Type: application/json');
// This is your test secret API key.

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

function getLineItems(array $items): array {
    $lineItems = [];
    $stripe = new \Stripe\StripeClient(
        $_SERVER['STRIPE_PRIVATE_KEY']
    );

    foreach ($items as $key => $item){
        $product = $stripe->products->all(["ids" => [$item->id]]);
        $price = $stripe->prices->search([
            'query' => 'product:\''.$item->id.'\'',
        ]);
        //if product not exist, we create it with the price
        if ($price->data){
            $price = $price->data[0];
        }
        else if (!$product->data){
            $stripe->products->create([
                'id' => $item->id,
                'name' => $item->product->name,
                'description' => $item->product->description,
            ]);
            $price = $stripe->prices->create([
                'unit_amount' => $item->price * 100,
                'currency' => 'eur',
                'tax_behavior' => 'inclusive',
                'product' => $item->id,
            ]);
        }
        else if (!$price->data) {
            $id = $product->data[0]["id"];
            $price = $stripe->prices->create([
                'unit_amount' => $item->price * 100, 
                'currency' => 'eur',
                'tax_behavior' => 'inclusive',
                'product' => $id,
            ]);
        }
        array_push($lineItems, ['price' => $price->id, 'quantity' => $item->amount]);
    }
    return $lineItems;
}

class CreatePayment{

    #[Route('/api/create', name: 'create', methods: ['POST'])]
    public function create(){
        \Stripe\Stripe::setApiKey($_SERVER['STRIPE_PRIVATE_KEY']);

        try {
            // retrieve JSON from POST body
            $jsonStr = file_get_contents('php://input');
            $jsonObj = json_decode($jsonStr);

            $array = getLineItems($jsonObj);
            $standard_shipping = "shr_1MM7VOKpRc4HZ65yqaFXguj4";
            //if order is over 1000 euros, the shipping is free
            if (calculateOrderAmount($jsonObj) > 1000){
                $standard_shipping = "shr_1MM71ZKpRc4HZ65yLFYDJwQo";
            }
            $checkout_session = \Stripe\Checkout\Session::create([
                'shipping_address_collection' => ['allowed_countries' => ['FR']],
                'payment_method_types' => ['card'],
                'line_items' => getLineItems($jsonObj),
                'mode' => 'payment',
                'billing_address_collection' => 'required',
                'shipping_options' => [
                    ['shipping_rate' => $standard_shipping],
                    ['shipping_rate' => 'shr_1MM732KpRc4HZ65yGGYa1tYU'],
                ],
                'success_url' => 'http://localhost:3000',
                'automatic_tax' => [
                    'enabled' => true,
                ],
            ]);

            return new JsonResponse(json_encode($checkout_session->url));
        } catch (Error $e) {
            http_response_code(500);
            return json_encode(['error' => $e->getMessage()]);
        }
    }

}