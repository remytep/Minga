<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ViewCountController extends AbstractController
{
    private $productRepository;
    private $entityManager;

    public function __construct(ProductRepository $productRepository, EntityManagerInterface $entityManager)
    {
        $this->productRepository = $productRepository;
        $this->entityManager = $entityManager;
    }

    #[Route('/api/products/viewCount/{id}', name: 'app_view_count')]
    public function viewAction(int $id): JsonResponse
    {
        $product = $this->productRepository->find($id);
        // code to handle product view tracking goes here
        // Increment the view count
        $product->setViewCount($product->getViewCount() + 1);

        // Save the updated product to the database
        $this->entityManager->persist($product);
        $this->entityManager->flush();
        return new JsonResponse(['status' => 'success']);
    }
}
