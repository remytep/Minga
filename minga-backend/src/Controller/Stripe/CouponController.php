<?php

namespace App\Controller\Stripe;

use App\Entity\Sku;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

class CouponController{
    #[Route('/api/coupon', name: 'get_coupons', methods: ['GET'])]
    public function getCoupons(){    
        $stripe = new \Stripe\StripeClient($_SERVER['STRIPE_PRIVATE_KEY']);
        try {
            $coupons = $stripe->promotionCodes->all();
            return new JsonResponse($coupons->data);
        } catch (Error $e) {
            http_response_code(500);
            return new JsonResponse(json_encode(['error' => $e->getMessage()]));
        }
    }

    #[Route('/api/customers', name: 'get_customers', methods: ['GET'])]
    public function getCustomers(){    
        $stripe = new \Stripe\StripeClient($_SERVER['STRIPE_PRIVATE_KEY']);
        try {
            $customers = $stripe->customers->all();
            return new JsonResponse($customers->data);
        } catch (Error $e) {
            http_response_code(500);
            return new JsonResponse(json_encode(['error' => $e->getMessage()]));
        }
    }

    #[Route('/api/customer/{id}', name: 'get_customer', methods: ['GET'])]
    public function getCustomer(Request $request, $id) {    
        $stripe = new \Stripe\StripeClient($_SERVER['STRIPE_PRIVATE_KEY']);
        try {
            $customer = $stripe->customers->retrieve($id, []);
            return new JsonResponse($customer);
        } catch (Error $e) {
            http_response_code(500);
            return new JsonResponse(json_encode(['error' => $e->getMessage()]));
        }
    }
    
    #[Route('/api/coupon/{id}', name: 'get_coupon', methods: ['GET'])]
    public function getCoupon(Request $request, $id) {    
        $stripe = new \Stripe\StripeClient($_SERVER['STRIPE_PRIVATE_KEY']);
        try {
            $codePromo = $stripe->promotionCodes->retrieve($id, []);
            return new JsonResponse($codePromo);
        } catch (Error $e) {
            http_response_code(500);
            return new JsonResponse(json_encode(['error' => $e->getMessage()]));
        }
    }


    #[Route('/api/coupon', name: 'post_coupon', methods: ['POST'])]
    public function postCoupon(){    
        $stripe = new \Stripe\StripeClient($_SERVER['STRIPE_PRIVATE_KEY']);
        try {
            $jsonStr = file_get_contents('php://input');
            $jsonObj = json_decode($jsonStr);
            $paramsCoupon = ['duration' => 'forever'];
            foreach ($jsonObj->coupon as $key => $value){
                if ($key === "type" || !$value || $value === ""){
                    continue;
                }
                $paramsCoupon[$key] = $value;
            }
            $coupon = $stripe->coupons->create($paramsCoupon);
            $paramsCodePromo = ['coupon' => $coupon->id];
            foreach ($jsonObj->codePromo as $key => $value){
                if (!$value || $value === "" || ($jsonObj->coupon->type === "percent_off" && $key === "currency")){
                    continue;
                }
                if ($key === "restrictions"){
                    $paramsCodePromo[$key] = (array)$value;
                }
                else if ($key === "amount_off"){
                    $paramsCodePromo[$key] = $value * 100;
                }
                else {
                    $paramsCodePromo[$key] = $value;
                }
            }
            if ($jsonObj->coupon->type === "amount_off"){
                $paramsCodePromo["restrictions"]["minimum_amount_currency"] = $jsonObj->coupon->currency;
            }
            $codePromo = $stripe->promotionCodes->create($paramsCodePromo);

            return new JsonResponse($codePromo);
        } catch (Error $e) {
            http_response_code(500);
            return new JsonResponse(json_encode(['error' => $e->getMessage()]));
        }
    }

    
    #[Route('/api/coupon', name: 'update_coupon', methods: ['PUT'])]
    public function putCoupon(){    
        $stripe = new \Stripe\StripeClient($_SERVER['STRIPE_PRIVATE_KEY']);
        try {
            $jsonStr = file_get_contents('php://input');
            $jsonObj = json_decode($jsonStr);

            $coupon = $stripe->coupons->update(
                $jsonObj->id,
                ['name' => $jsonObj->name]
            );            

            return new JsonResponse($coupon);
        } catch (Error $e) {
            http_response_code(500);
            return new JsonResponse(json_encode(['error' => $e->getMessage()]));
        }
    }


}