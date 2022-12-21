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

#[AsController]
final class UploadFileController extends AbstractController
{
    public function __invoke(Request $request, FileUploader $fileUploader, ManagerRegistry $doctrine): Sku
    {
        $entityManager = $doctrine->getManager();

        //dd($request->get("stock"));
        $uploadedFile = $request->files->get('thumbnail');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"thumbnail" is required');
        }
        // create a new entity and set its values
        $sku = new Sku();
        // keep only numeric value of the request
        $slug = str_replace("/api/products/", "", $request->get("product"));
        $product = $entityManager
            ->getRepository(Product::class)
            ->findOneBy(['slug' => $slug]);
        $sku->setPrice($request->get('price'));
        $sku->setStock($request->get('stock'));
        $sku->setProduct($product);
        $sku->setReferenceNumber($request->get('referenceNumber'));
        // upload the file and save its filename
        $sku->setThumbnail($fileUploader->upload(
            $uploadedFile, 
            $request->get('referenceNumber'),
            "sku"
        ));

        return $sku;
    }
}
