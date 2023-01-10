<?php

namespace App\Controller;

use App\Entity\OrderItem;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use ApiPlatform\Core\Bridge\Symfony\Validator\Exception\ValidationException;
use ApiPlatform\Api\IriConverterInterface;


class OrderItemController
{
    private $entityManager;
    private $iriConverter;
    private $serializer;
    private $validator;
    private $normalizer;
    private $apiValidator;

    public function __construct(EntityManagerInterface $entityManager, IriConverterInterface $iriConverter, SerializerInterface $serializer, ValidatorInterface $validator)
    {
        $this->entityManager = $entityManager;
        $this->iriConverter = $iriConverter;
        $this->serializer = $serializer;
        $this->validator = $validator;
    }

    #[Route("/order_items", name: "app_order_item_post", methods: ["POST"])]
    public function createAction(Request $request): Response
    {
        // retrieve the sku parameter from the request as an IRI string
        $req = (json_decode($request->getContent()));
        $skuIri = $req->sku;

        // retrieve the orderNumber parameter from the request as an IRI string
        $orderNumberIri = $req->orderNumber;

        // retrieve the quantity parameter from the request
        $quantity = $req->quantity;

        // convert the sku IRI string to a Sku entity
        $sku = $this->iriConverter->getResourceFromIri($skuIri);

        // convert the orderNumber IRI string to an OrderNumber entity
        $orderNumber = $this->iriConverter->getResourceFromIri($orderNumberIri);

        // check if an OrderItem entity with the same sku and orderNumber already exists
        $existingOrderItem = $this->entityManager->getRepository(OrderItem::class)->findOneBy([
            'sku' => $sku,
            'orderNumber' => $orderNumber,
        ]);

        if ($existingOrderItem) {
            // if an OrderItem entity with the same sku and orderNumber already exists,
            // increment the quantity of the existing entity by the provided quantity
            $existingOrderItem->setQuantity($existingOrderItem->getQuantity() + $quantity);
            $orderItem = $existingOrderItem;
        } else {
            // otherwise, create a new OrderItem entity with the provided sku, orderNumber, and quantity
            $orderItem = new OrderItem();
            $orderItem->setSku($sku);
            $orderItem->setOrderNumber($orderNumber);
            $orderItem->setQuantity($quantity);
        }

        // validate the OrderItem entity
        $errors = $this->validator->validate($orderItem);
        if (count($errors) > 0) {
            // throw a validation exception if the OrderItem entity is invalid
            throw new ValidationException($errors);
        }

        // persist the OrderItem entity to the database
        $this->entityManager->persist($orderItem);
        $this->entityManager->flush();



        // return a JSON response with the normalized OrderItem entity
        return new Response($this->serializer->serialize('created', 'json'), 201);
    }
    #[Route("/order_items", name: "app_order_item_patch", methods: ["PATCH"])]
    public function updateAction(Request $request): Response
    {
        // retrieve the sku parameter from the request as an IRI string
        $req = (json_decode($request->getContent()));
        $skuIri = $req->sku;

        // retrieve the orderNumber parameter from the request as an IRI string
        $orderNumberIri = $req->orderNumber;

        // retrieve the quantity parameter from the request
        $quantity = $req->quantity;

        // convert the sku IRI string to a Sku entity
        $sku = $this->iriConverter->getResourceFromIri($skuIri);

        // convert the orderNumber IRI string to an OrderNumber entity
        $orderNumber = $this->iriConverter->getResourceFromIri($orderNumberIri);

        // check if an OrderItem entity with the same sku and orderNumber already exists
        $existingOrderItem = $this->entityManager->getRepository(OrderItem::class)->findOneBy([
            'sku' => $sku,
            'orderNumber' => $orderNumber,
        ]);

        if ($existingOrderItem) {
            // if an OrderItem entity with the same sku and orderNumber already exists,
            // increment the quantity of the existing entity by the provided quantity
            $existingOrderItem->setQuantity($quantity);
            $orderItem = $existingOrderItem;
        }

        // validate the OrderItem entity
        $errors = $this->validator->validate($orderItem);
        if (count($errors) > 0) {
            // throw a validation exception if the OrderItem entity is invalid
            throw new ValidationException($errors);
        }

        // persist the OrderItem entity to the database
        $this->entityManager->persist($orderItem);
        $this->entityManager->flush();

        // return a JSON response with the normalized OrderItem entity
        return new Response($this->serializer->serialize('updated', 'json'), 202);
    }
    #[Route("/order_items", name: "app_order_item_delete", methods: ['DELETE'])]
    public function deleteAction(Request $request): Response
    {
        // retrieve the sku parameter from the request as an IRI string
        $req = (json_decode($request->getContent()));
        $skuIri = $req->sku;

        // retrieve the orderNumber parameter from the request as an IRI string
        $orderNumberIri = $req->orderNumber;

        // convert the sku IRI string to a Sku entity
        $sku = $this->iriConverter->getResourceFromIri($skuIri);

        // convert the orderNumber IRI string to an OrderNumber entity
        $orderNumber = $this->iriConverter->getResourceFromIri($orderNumberIri);

        // check if an OrderItem entity with the same sku and orderNumber already exists
        $existingOrderItem = $this->entityManager->getRepository(OrderItem::class)->findOneBy([
            'sku' => $sku,
            'orderNumber' => $orderNumber,
        ]);

        if ($existingOrderItem) {
            // if an OrderItem entity with the same sku and orderNumber already exists,
            // increment the quantity of the existing entity by the provided quantity
            $orderItem = $existingOrderItem;
            $this->entityManager->remove($orderItem);
            $this->entityManager->flush();
        }

        // return a JSON response with the normalized OrderItem entity
        return new Response('deleted', 202);
    }
}
