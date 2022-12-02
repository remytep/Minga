<?php

namespace App\Entity;

use App\Repository\ProductCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: ProductCategoryRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['productCategory:read']],
    denormalizationContext: ['groups' => ['productCategory:write']],
    operations: [
        new GetCollection(),
        new Get(),
        new Put(),
        new Post(),
        new Patch(),
    ]
)]
class ProductCategory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['productCategory:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['productCategory:read', 'productCategory:write', 'product:read'])]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'productCategory', targetEntity: Product::class)]
    #[Groups(['productCategory:read'])]
    private Collection $products;

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
            $product->setProductCategory($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->products->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getProductCategory() === $this) {
                $product->setProductCategory(null);
            }
        }

        return $this;
    }
}
