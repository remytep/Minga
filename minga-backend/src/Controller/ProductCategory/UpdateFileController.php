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
use AliReaza\Component\HttpFoundation\Request\FormData;

#[AsController]
final class UpdateFileController extends AbstractController
{
    public function __invoke(Request $request, FileUploader $fileUploader, ManagerRegistry $doctrine): ProductCategory
    {
        $data = new FormData($request->getContent());
        $entityManager = $doctrine->getManager();
        $path = "productCategory";

        //dd($request->get("data"));
        if (count($data->inputs) === 0) {
            $data = json_decode($request->getContent());
            $productCategory = $entityManager
                ->getRepository(ProductCategory::class)
                ->find($data->originId);
            $productCategory->setName($data->name);
            $productCategory->setThumbnail(
                $fileUploader->rename(
                    $request->get("previous_data")->getThumbnail(),
                    $data->name,
                    $path,
                )
            );
        } else {
            $productCategory = $entityManager
                ->getRepository(ProductCategory::class)
                ->find($data->inputs["originId"]);
            $productCategory->setName($data->inputs["name"]);
            // upload the file and save its filename
            $uploadedFile = $data->files["thumbnail"];
            $productCategory->setThumbnail($fileUploader->update(
                $uploadedFile,
                $data->inputs["name"],
                $path,
                $request->get("previous_data")->getThumbnail(),
            ));
        }

        return $productCategory;
    }
}
