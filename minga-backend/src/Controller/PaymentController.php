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
    $items = json_decode($items[0]);
    $totalAmount = 0;
    foreach ($items as $item) {
        $totalAmount += $item->price;
    }
    //stripe takes the amout from penny
    return $totalAmount * 100;
}

class CreatePayment{

    #[Route('/api/create', name: 'create', methods: ['POST'])]
    public function create(){
        \Stripe\Stripe::setApiKey($_SERVER['STRIPE_PRIVATE_KEY']);
        try {
            // retrieve JSON from POST body
            $jsonStr = file_get_contents('php://input');
            $jsonObj = json_decode($jsonStr);


            // Create a PaymentIntent with amount and currency
            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => calculateOrderAmount($jsonObj->items),
                'currency' => 'eur',
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
            ]);

            $output = [
                'clientSecret' => $paymentIntent->client_secret,
            ];

            return new JsonResponse(json_encode($output));
        } catch (Error $e) {
            http_response_code(500);
            return json_encode(['error' => $e->getMessage()]);
        }
    }

}