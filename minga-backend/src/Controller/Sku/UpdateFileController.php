<?php

namespace App\Controller\Sku;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use App\Entity\Product;
use App\Entity\ProductSubCategory;
use App\Entity\Sku;
use App\Service\FileUploader;
use App\Repository\ProductSubCategoryRepository;
use Doctrine\Persistence\ManagerRegistry;
use AliReaza\Component\HttpFoundation\Request\FormData;

#[AsController]
final class UpdateFileController extends AbstractController
{
    public function __invoke(Request $request, FileUploader $fileUploader, ManagerRegistry $doctrine): Sku
    {
        $data = new FormData($request->getContent());
        $entityManager = $doctrine->getManager();
        $path = "sku";

        //dd($request->get("data"));
        if (count($data->inputs) === 0) {
            $data = json_decode($request->getContent());
            $sku = $entityManager
                ->getRepository(Sku::class)
                ->find($data->originId);
            $slug = str_replace("/api/products/", "", $data->product);
            $product = $entityManager
                ->getRepository(Product::class)
                ->findOneBy(['slug' => $slug]);
            $sku->setStock($data->stock);
            $sku->setPrice($data->price);
            $sku->setReferenceNumber($data->referenceNumber);
            $sku->setWeight($data->weight);
            $sku->setProduct($product);
            $sku->setThumbnail(
                $fileUploader->rename(
                    $request->get("previous_data")->getThumbnail(),
                    $data->referenceNumber,
                    $path
                )
            );
            $sku->setDiscountPercent($data->discountPercent);
        } else {
            $sku = $entityManager
                ->getRepository(Sku::class)
                ->find($data->inputs["originId"]);
            $slug = str_replace("/api/products/", "", $data->inputs["product"]);
            $product = $entityManager
                ->getRepository(Product::class)
                ->findOneBy(['slug' => $slug]);
            $sku->setPrice($data->inputs["price"]);
            $sku->setStock($data->inputs["stock"]);
            $sku->setWeight($data->inputs["weight"]);
            $sku->setProduct($product);
            $sku->setReferenceNumber($data->inputs["referenceNumber"]);
            // upload the file and save its filename
            $uploadedFile = $data->files["thumbnail"];
            $sku->setThumbnail($fileUploader->update(
                $uploadedFile,
                $data->inputs["referenceNumber"],
                $path,
                $request->get("previous_data")->getThumbnail(),
            ));
            $sku->setDiscountPercent($data->inputs["discountPercent"]);
        }



        return $sku;
    }
}
