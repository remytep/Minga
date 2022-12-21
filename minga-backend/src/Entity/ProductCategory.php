<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductCategoryRepository;
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


#[ORM\Entity(repositoryClass: ProductCategoryRepository::class)]
#[ApiResource(
    paginationEnabled: false,
    operations: [
        new GetCollection(),
        new Get(normalizationContext: ['groups' => ['product_category.read', 'product_category.item.get']]),
        new Put(),
        new Post(),
        new Patch(),
        new Delete()
    ],
    normalizationContext: ['groups' => ['product_category.read']],
    denormalizationContext: ['groups' => ['product_category.write']],
)]
class ProductCategory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[ApiProperty(identifier: false)]
    #[Groups(['product_category.read', 'product_category.write', 'product_sub_category.read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[ApiProperty(identifier: true)]
    #[Groups(['product_category.read', 'product_category.write'])]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'productCategory', targetEntity: ProductSubCategory::class, orphanRemoval: true)]
    #[Groups(['product_category.read', 'product_category.write'])]
    private Collection $productSubCategories;

    public function __construct()
    {
        $this->productSubCategories = new ArrayCollection();
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
     * @return Collection<int, ProductSubCategory>
     */
    public function getProductSubCategories(): Collection
    {
        return $this->productSubCategories;
    }

    public function addProductSubCategory(ProductSubCategory $productSubCategory): self
    {
        if (!$this->productSubCategories->contains($productSubCategory)) {
            $this->productSubCategories->add($productSubCategory);
            $productSubCategory->setProductCategory($this);
        }

        return $this;
    }

    public function removeProductSubCategory(ProductSubCategory $productSubCategory): self
    {
        if ($this->productSubCategories->removeElement($productSubCategory)) {
            // set the owning side to null (unless already changed)
            if ($productSubCategory->getProductCategory() === $this) {
                $productSubCategory->setProductCategory(null);
            }
        }

        return $this;
    }
}
