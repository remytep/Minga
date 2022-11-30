<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

        #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ProductCategory $product_category = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $thumbnail = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $createdAt = null;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: ProductOption::class)]
    private Collection $productOptions;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: Sku::class)]
    private Collection $skus;



    public function __construct()
    {
        $this->productOptions = new ArrayCollection();
        $this->skus = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getThumbnail(): ?string
    {
        return $this->thumbnail;
    }

    public function setThumbnail(string $thumbnail): self
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection<int, ProductOption>
     */
    public function getProductOptions(): Collection
    {
        return $this->productOptions;
    }

    public function addProductOption(ProductOption $productOption): self
    {
        if (!$this->productOptions->contains($productOption)) {
            $this->productOptions->add($productOption);
            $productOption->setProduct($this);
        }

        return $this;
    }

    public function removeProductOption(ProductOption $productOption): self
    {
        if ($this->productOptions->removeElement($productOption)) {
            // set the owning side to null (unless already changed)
            if ($productOption->getProduct() === $this) {
                $productOption->setProduct(null);
            }
        }

        return $this;
    }

    public function getProductCategory(): ?ProductCategory
    {
        return $this->product_category;
    }

    public function setProductCategory(?ProductCategory $product_category): self
    {
        $this->product_category = $product_category;

        return $this;
    }

    /**
     * @return Collection<int, Sku>
     */
    public function getSkus(): Collection
    {
        return $this->skus;
    }

    public function addSku(Sku $sku): self
    {
        if (!$this->skus->contains($sku)) {
            $this->skus->add($sku);
            $sku->setProduct($this);
        }

        return $this;
    }

    public function removeSku(Sku $sku): self
    {
        if ($this->skus->removeElement($sku)) {
            // set the owning side to null (unless already changed)
            if ($sku->getProduct() === $this) {
                $sku->setProduct(null);
            }
        }

        return $this;
    }
}
