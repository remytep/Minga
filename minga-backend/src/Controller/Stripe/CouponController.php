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
            $coupons = $stripe->coupons->all();
            return new JsonResponse($coupons->data);
        } catch (Error $e) {
            http_response_code(500);
            return new JsonResponse(json_encode(['error' => $e->getMessage()]));
        }
    }

    #[Route('/api/coupon/{id}', name: 'get_coupon', methods: ['GET'])]
    public function getCoupon(Request $request, $id) {    
        $stripe = new \Stripe\StripeClient($_SERVER['STRIPE_PRIVATE_KEY']);
        try {
            $coupon = $stripe->coupons->retrieve($id, []);
            return new JsonResponse($coupon);
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
            //dd($jsonObj->percent_off);
            $params = ['duration' => 'forever'];
            foreach ($jsonObj as $key => $value){
                if ($key === "type" || !$value || $value === ""){
                    continue;
                }
                if ($value){
                    $params[$key] = $value;
                }
            }
            $coupon = $stripe->coupons->create($params);
            

            return new JsonResponse($coupon);
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