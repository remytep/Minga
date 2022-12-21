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
use AliReaza\Component\HttpFoundation\Request\FormData;

#[AsController]
final class UpdateFileController extends AbstractController
{
    public function __invoke(Request $request, FileUploader $fileUploader, ManagerRegistry $doctrine): ProductSubCategory
    {
        $data = new FormData($request->getContent());
        $entityManager = $doctrine->getManager();
        $path = "productSubCategory";

        //dd($request->get("data"));
        if (count($data->inputs) === 0) {
            $data = json_decode($request->getContent());
            $productSubCategory = $entityManager
                ->getRepository(productSubCategory::class)
                ->find($data->originId);
            $name = str_replace("/api/product_categories/", "", $data->productCategory);
            $productCategory = $entityManager
                ->getRepository(ProductCategory::class)
                ->findOneBy(['name' => $name]);
            $productSubCategory->setName($data->name);
            $productSubCategory->setProductCategory($productCategory);
            $productSubCategory->setThumbnail(
                $fileUploader->rename(
                    $request->get("previous_data")->getThumbnail(),
                    $data->name,
                    $path,
                )
            );
        } else {
            $productSubCategory = $entityManager
                ->getRepository(productSubCategory::class)
                ->find($data->inputs["originId"]);
            $name = str_replace("/api/product_categories/", "", $data->inputs["productCategory"]);
            $productCategory = $entityManager
                ->getRepository(ProductCategory::class)
                ->findOneBy(['name' => $name]);
            $productSubCategory->setName($data->inputs["name"]);
            $productSubCategory->setProductCategory($productCategory);
            // upload the file and save its filename
            $uploadedFile = $data->files["thumbnail"];
            $productSubCategory->setThumbnail($fileUploader->update(
                $uploadedFile,
                $data->inputs["name"],
                $path,
                $request->get("previous_data")->getThumbnail(),
            ));
        }

        return $productSubCategory;
    }
}
