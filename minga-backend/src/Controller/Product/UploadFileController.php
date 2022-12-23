<?php

namespace App\Controller\Product;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use App\Entity\Product;
use App\Entity\ProductSubCategory;
use App\Service\FileUploader;
use App\Repository\ProductSubCategoryRepository;
use Doctrine\Persistence\ManagerRegistry;

#[AsController]
final class UploadFileController extends AbstractController
{
    public function __invoke(Request $request, FileUploader $fileUploader, ManagerRegistry $doctrine): Product
    {
        $entityManager = $doctrine->getManager();

        //dd($request->get("stock"));
        $uploadedFile = $request->files->get('thumbnail');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"thumbnail" is required');
        }
        // create a new entity and set its values
        $product = new Product();
        // keep only numeric value of the request
        $name = str_replace("/api/product_sub_categories/", "", $request->get("ProductSubCategory"));
        $productSubCategory = $entityManager
            ->getRepository(ProductSubCategory::class)
            ->findOneBy(['name' => $name]);
        $product->setName($request->get('name'));
        $product->setDescription($request->get('description'));
        $product->setSlug($request->get('slug'));
        $product->setFeatured($request->get('featured'));
        $product->setProductSubCategory($productSubCategory);
        // upload the file and save its filename
        $product->setThumbnail($fileUploader->upload(
            $uploadedFile, 
            $request->get('slug'),
            "product",
        ));

        return $product;
    }
}
