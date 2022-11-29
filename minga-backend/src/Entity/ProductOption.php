<?php

namespace App\Entity;

use App\Repository\ProductOptionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductOptionRepository::class)]
class ProductOption
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'productOptions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'product_option', targetEntity: ProductOptionValue::class)]
    private Collection $productOptionValues;

    #[ORM\OneToMany(mappedBy: 'product_option', targetEntity: SKUValues::class)]
    private Collection $sKUValues;

    public function __construct()
    {
        $this->productOptionValues = new ArrayCollection();
        $this->sKUValues = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
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
     * @return Collection<int, ProductOptionValue>
     */
    public function getProductOptionValues(): Collection
    {
        return $this->productOptionValues;
    }

    public function addProductOptionValue(ProductOptionValue $productOptionValue): self
    {
        if (!$this->productOptionValues->contains($productOptionValue)) {
            $this->productOptionValues->add($productOptionValue);
            $productOptionValue->setProductOption($this);
        }

        return $this;
    }

    public function removeProductOptionValue(ProductOptionValue $productOptionValue): self
    {
        if ($this->productOptionValues->removeElement($productOptionValue)) {
            // set the owning side to null (unless already changed)
            if ($productOptionValue->getProductOption() === $this) {
                $productOptionValue->setProductOption(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, SKUValues>
     */
    public function getSKUValues(): Collection
    {
        return $this->sKUValues;
    }

    public function addSKUValue(SKUValues $sKUValue): self
    {
        if (!$this->sKUValues->contains($sKUValue)) {
            $this->sKUValues->add($sKUValue);
            $sKUValue->setProductOption($this);
        }

        return $this;
    }

    public function removeSKUValue(SKUValues $sKUValue): self
    {
        if ($this->sKUValues->removeElement($sKUValue)) {
            // set the owning side to null (unless already changed)
            if ($sKUValue->getProductOption() === $this) {
                $sKUValue->setProductOption(null);
            }
        }

        return $this;
    }
}
