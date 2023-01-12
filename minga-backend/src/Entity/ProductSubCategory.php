<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductSubCategoryRepository;
use App\Controller\ProductSubCategory\UploadFileController;
use App\Controller\ProductSubCategory\UpdateFileController;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiProperty;
use Symfony\Component\Validator\Constraints\Length;

#[ORM\Entity(repositoryClass: ProductSubCategoryRepository::class)]

#[ApiResource(
    paginationEnabled: false,
    operations: [
        new GetCollection(),
        new Get(normalizationContext: ['groups' => ['product_sub_category.read', 'product_sub_category.item.get']]),
        new Put(controller: UpdateFileController::class, deserialize: false),
        new Post(controller: UploadFileController::class, deserialize: false),
        new Patch(),
        new Delete()
    ],
    normalizationContext: ['groups' => ['product_sub_category.read']],
    denormalizationContext: ['groups' => ['product_sub_category.write']],
)]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'exact'])]
class ProductSubCategory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[ApiProperty(identifier: false)]
    #[Groups(['product_sub_category.read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[ApiProperty(identifier: true)]
    #[Groups(['product_sub_category.read', 'product_sub_category.write', 'product.read', 'product_category.read', 'product_sub_category.item.get', 'sku.read', 'sku_value.read', 'order.read']), Length(min: 3)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'productSubCategory', targetEntity: Product::class)]
    #[Groups(['product_sub_category.read', 'product_sub_category.write'])]
    private Collection $products;

    #[ORM\ManyToOne(inversedBy: 'productSubCategories')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['product_sub_category.read', 'product_sub_category.write', 'product.read', 'sku.read'])]
    private ?ProductCategory $productCategory = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['product_sub_category.read', 'product_sub_category.write', 'product_category.read'])]
    private ?string $thumbnail = null;


    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Product>
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products->add($product);
            $product->setProductSubCategory($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->products->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getProductSubCategory() === $this) {
                $product->setProductSubCategory(null);
            }
        }

        return $this;
    }

    public function getProductCategory(): ?ProductCategory
    {
        return $this->productCategory;
    }

    public function setProductCategory(?ProductCategory $productCategory): self
    {
        $this->productCategory = $productCategory;

        return $this;
    }

    public function getThumbnail(): ?string
    {
        return $this->thumbnail;
    }

    public function setThumbnail(?string $thumbnail): self
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }
}
