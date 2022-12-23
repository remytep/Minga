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
    return 1400;
}

class CreatePayment{

    #[Route('/api/create', name: 'create', methods: ['POST'])]
    public function create(){
        \Stripe\Stripe::setApiKey('sk_test_51M98c5KpRc4HZ65yys9CzJpUpSI6pY5ZRVxMwKfAJL9KG7AuND2XC30OOYV1lAMXMsK9LKTfgQThOP509lEb4QYt006g4xxPEG');
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