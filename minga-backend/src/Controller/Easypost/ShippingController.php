<?php

namespace App\Controller\Easypost;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

function calculateTotalWeightInOz(array $items): int {
    $totalAmount = 0;
    foreach ($items as $item) {
        $totalAmount += $item->weight * $item->amount;
    }
    return round($totalAmount / 1000 * 35.274);
}

function getCustomItems($items): array {
    $custom_items = [];

    foreach ($items as $key => $item){
        array_push($custom_items, [
            'description' => $item->referenceNumber, 
            'quantity' => $item->amount,
            'weight' => $item->weight / 1000 * 35.274 * $item->amount,
            'value' => $item->price * $item->amount,
            'currency' => "eur",
            "hs_tariff_number" => "123456",
            "origin_country" => "US"
        ]);
    }
    return $custom_items;
}

class ShippingController extends AbstractController
{
    public static function getShipping($jsonObj) {
        \EasyPost\EasyPost::setApiKey($_SERVER["EASYPOST_KEY"]);

        $cart = $jsonObj->cart;
        $parcel_weight = calculateTotalWeightInOz($cart);
        $customer = $jsonObj->customerInfos; 
        $custom_items = getCustomItems($cart);
//        dd($customer->address);
        $shipment = \EasyPost\Shipment::create([
            'to_address' => [
                'name' => $customer->name,
                'email' => $customer->email,
                'street1' => $customer->address->street_number . " " . $customer->address->route,
                'city' => $customer->address->locality,
                'state' => $customer->address->administrative_area_level_1,
                'zip' => $customer->address->postal_code,
                'country' => $customer->address->country,
                'phone' => substr($customer->phone, 1),
            ],
            'from_address' => [
                'name' => 'EasyPost',
                'street1' => '417 Montgomery Street',
                'street2' => '5th Floor',
                'city' => 'San Francisco',
                'state' => 'CA',
                'zip' => '94104',
                'country' => 'US',
                'phone' => '3331114444',
                'email' => 'support@easypost.com'
            ],
            'parcel' => [
                'weight' => $parcel_weight
            ],
            'customs_info' => [
                'eel_pfc' => 'NOEEI 30.37(a)',
                'customs_certify' => true,
                'customs_signer' => 'Steve Brule',
                'contents_type' => 'merchandise',
                'contents_explanation' => '',
                'restriction_type' => 'none',
                'customs_items' => $custom_items,
            ],
            'carrer_accounts' => ['ca_0fc958cc78e34af1896ac086c63bdb3e', 'ca_0fc958cc78e34af1896ac086c63bdb3e', 'ca_9f75202dc2a24597a743c3a14323b979']
        ]);
        return $shipment;
    }

    public static function retrieveShipping($id) {
        \EasyPost\EasyPost::setApiKey($_SERVER["EASYPOST_KEY"]);

        $shipment = \EasyPost\Shipment::retrieve($id);
        return $shipment;
    }

    #[Route('/api/tracking/{id}', name: 'get_tracking', methods: ['GET'])]
    public static function retrieveTracking($id) {
        \EasyPost\EasyPost::setApiKey($_SERVER["EASYPOST_KEY"]);

        try {
            $tracker = \EasyPost\Tracker::retrieve($id);
            return new Response($tracker);
        } catch (Error $e) {
            http_response_code(500);
            return new JsonResponse(json_encode(['error' => $e->getMessage()]));
        }
    }

}
