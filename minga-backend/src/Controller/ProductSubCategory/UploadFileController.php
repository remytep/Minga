<?php

namespace App\Controller\ProductSubCategory;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use App\Entity\ProductCategory;
use App\Entity\ProductSubCategory;
use App\Service\FileUploader;
use App\Repository\ProductSubCategoryRepository;
use Doctrine\Persistence\ManagerRegistry;

#[AsController]
final class UploadFileController extends AbstractController
{
    public function __invoke(Request $request, FileUploader $fileUploader, ManagerRegistry $doctrine): ProductSubCategory
    {
        $entityManager = $doctrine->getManager();

        //dd($request->get("stock"));
        $uploadedFile = $request->files->get('thumbnail');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"thumbnail" is required');
        }
        // create a new entity and set its values
        $productSubCategory = new productSubCategory();
        $name = str_replace("/api/product_categories/", "", $request->get("productCategory"));
        $productCategory = $entityManager
            ->getRepository(ProductCategory::class)
            ->findOneBy(['name' => $name]);
        $productSubCategory->setName($request->get("name"));
        $productSubCategory->setProductCategory($productCategory);
        $productSubCategory->setThumbnail($fileUploader->upload(
            $uploadedFile, 
            $request->get('name'),
            "productSubCategory"
        ));

        return $productSubCategory;
    }
}
