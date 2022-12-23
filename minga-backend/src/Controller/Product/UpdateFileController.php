<?php

namespace App\Controller\Product;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use App\Entity\ProductSubCategory;
use App\Entity\Product;
use App\Service\FileUploader;
use App\Repository\ProductSubCategoryRepository;
use Doctrine\Persistence\ManagerRegistry;
use AliReaza\Component\HttpFoundation\Request\FormData;

#[AsController]
final class UpdateFileController extends AbstractController
{
    public function __invoke(Request $request, FileUploader $fileUploader, ManagerRegistry $doctrine): Product
    {
        $data = new FormData($request->getContent());
        $entityManager = $doctrine->getManager();
        $path = "product";

        //dd($request->get("data"));
        if (count($data->inputs) === 0) {
            $data = json_decode($request->getContent());
            $product = $entityManager
                ->getRepository(Product::class)
                ->find($data->originId);
            $name = str_replace("/api/product_sub_categories/", "", $data->ProductSubCategory);
            $productSubCategory = $entityManager
                ->getRepository(ProductSubCategory::class)
                ->findOneBy(['name' => $name]);
            $product->setName($data->name);
            $product->setDescription($data->description);
            $product->setSlug($data->slug);
            $product->setProductSubCategory($productSubCategory);
            $product->setThumbnail(
                $fileUploader->rename(
                    $request->get("previous_data")->getThumbnail(),
                    $data->slug,
                    $path
                )
            );
        } else {
            $product = $entityManager
                ->getRepository(Product::class)
                ->find($data->inputs["originId"]);
            $name = str_replace("/api/product_sub_categories/", "", $data->inputs["ProductSubCategory"]);
            $productSubCategory = $entityManager
                ->getRepository(ProductSubCategory::class)
                ->findOneBy(['name' => $name]);
            $product->setName($data->inputs["name"]);
            $product->setDescription($data->inputs["description"]);
            $product->setSlug($data->inputs["slug"]);
            $product->setFeatured($data->inputs["featured"]);
            $product->setProductSubCategory($productSubCategory);
            // upload the file and save its filename
            $uploadedFile = $data->files["thumbnail"];
            $product->setThumbnail($fileUploader->update(
                $uploadedFile,
                $data->inputs["slug"],
                $path,
                $request->get("previous_data")->getThumbnail(),
            ));
        }
        return $product;
    }
}
