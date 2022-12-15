<?php
namespace App\Controller;
 
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use App\Entity\Product;
use App\Entity\ProductCategory;
use App\Service\FileUploader;
use App\Repository\ProductCategoryRepository;
use Doctrine\Persistence\ManagerRegistry;

#[AsController]
final class UploadFileController extends AbstractController
{
    public function __invoke(Request $request, FileUploader $fileUploader, ManagerRegistry $doctrine): Product
    {        
        $entityManager = $doctrine->getManager();

        $uploadedFile = $request->files->get('thumbnail');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"thumbnail" is required');
        }
 
        // create a new entity and set its values
        $product = new Product();
        // keep only numeric value of the request
        $id = preg_replace('/[^0-9.]+/', '', $request->get("productCategory"));
        $product_category = $entityManager
                            ->getRepository(ProductCategory::class)
                            ->find($id);
        $product->setName($request->get('name'));
        $product->setDescription($request->get('description'));
        $product->setProductCategory($product_category);
        $product->setSlug($request->get('slug'));
        // upload the file and save its filename
        $product->setThumbnail($fileUploader->upload($uploadedFile));
 
        return $product;
    }
}

