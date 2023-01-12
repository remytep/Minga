<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Order;
use ApiPlatform\Api\IriConverterInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Service\OrderNumberGenerator;



class OrderController extends AbstractController
{
    private $entityManager;
    private $iriConverter;
    private $serializer;
    private $orderNumberGenerator;

    public function __construct(EntityManagerInterface $entityManager, SerializerInterface $serializer, IriConverterInterface $iriConverter, OrderNumberGenerator $orderNumberGenerator)
    {
        $this->orderNumberGenerator = $orderNumberGenerator;
        $this->entityManager = $entityManager;
        $this->iriConverter = $iriConverter;
        $this->serializer = $serializer;
    }
    #[Route('/order', name: 'app_order_post')]
    public function createAction(Request $request): Response
    {
        $req = (json_decode($request->getContent()));
        $userIri = $req->user;
        $user = $this->iriConverter->getResourceFromIri($userIri);

        // check if an OrderItem entity with the same sku and orderNumber already exists
        $existingOrderCart = $this->entityManager->getRepository(Order::class)->findOneBy([
            'user' => $user,
            'status' => 'CART'
        ]);

        if ($existingOrderCart) {
            // if an OrderItem entity with the same sku and orderNumber already exists,
            // increment the quantity of the existing entity by the provided quantity
            $orderCart = $existingOrderCart;
        } else {
            // otherwise, create a new OrderItem entity with the provided sku, orderNumber, and quantity
            $orderCart = new Order();
            $orderCart->setOrderNumber($this->orderNumberGenerator->generate());
            $orderCart->setUser($user);
        }

        // persist the OrderItem entity to the database
        $this->entityManager->persist($orderCart);
        $this->entityManager->flush();

        /*       dd($this->serializer->serialize($orderCart, 'json')); */
        // return a JSON response with the normalized OrderItem entity

        return new Response($this->serializer->serialize($orderCart, 'json'), 201);
    }
}
