<?php

namespace App\Controller\ProductCategory;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use App\Entity\ProductCategory;
use App\Service\FileUploader;
use App\Repository\ProductSubCategoryRepository;
use Doctrine\Persistence\ManagerRegistry;

#[AsController]
final class UploadFileController extends AbstractController
{
    public function __invoke(Request $request, FileUploader $fileUploader, ManagerRegistry $doctrine): ProductCategory
    {
        $entityManager = $doctrine->getManager();

        //dd($request->get("stock"));
        $uploadedFile = $request->files->get('thumbnail');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"thumbnail" is required');
        }
        // create a new entity and set its values
        $productCategory = new ProductCategory();
        $productCategory->setName($request->get("name"));
        $productCategory->setThumbnail($fileUploader->upload(
            $uploadedFile, 
            $request->get('name'),
            "productCategory"

        ));

        return $productCategory;
    }
}
