<?php

namespace App\Entity;

use App\Repository\ProductOptionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductOptionRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read']],
    denormalizationContext: ['groups' => ['write']],
)]
class ProductOption
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read', 'write'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'productOptions')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read', 'write'])]
    private ?Product $product = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read', 'write'])]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'product_option', targetEntity: ProductOptionValue::class)]
    #[Groups(['read', 'write'])]
    private Collection $productOptionValues;

    #[ORM\OneToMany(mappedBy: 'product_option', targetEntity: SkuValues::class)]
    private Collection $SkuValues;

    public function __construct()
    {
        $this->productOptionValues = new ArrayCollection();
        $this->SkuValues = new ArrayCollection();
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
    public function getSkuValues(): Collection
    {
        return $this->SkuValues;
    }

    public function addSKUValue(SkuValues $SkuValue): self
    {
        if (!$this->SkuValues->contains($SkuValue)) {
            $this->SkuValues->add($SkuValue);
            $SkuValue->setProductOption($this);
        }

        return $this;
    }

    public function removeSKUValue(SkuValues $SkuValue): self
    {
        if ($this->sKUValues->removeElement($SkuValue)) {
            // set the owning side to null (unless already changed)
            if ($SkuValue->getProductOption() === $this) {
                $SkuValue->setProductOption(null);
            }
        }

        return $this;
    }
}
