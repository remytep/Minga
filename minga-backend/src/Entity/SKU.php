<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SkuRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SkuRepository::class)]
#[ApiResource]
class Sku
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'skus')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product = null;

    #[ORM\Column]
    private ?int $price = null;

    #[ORM\Column]
    private ?int $stock = null;

    #[ORM\Column(length: 255)]
    private ?string $reference_number = null;

    #[ORM\OneToMany(mappedBy: 'Sku', targetEntity: SkuValue::class)]
    private Collection $skuValues;

    public function __construct()
    {
        $this->skuValues = new ArrayCollection();
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

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): self
    {
        $this->stock = $stock;

        return $this;
    }

    public function getReferenceNumber(): ?string
    {
        return $this->reference_number;
    }

    public function setReferenceNumber(string $reference_number): self
    {
        $this->reference_number = $reference_number;

        return $this;
    }

    /**
     * @return Collection<int, SkuValue>
     */
    public function getSkuValues(): Collection
    {
        return $this->skuValues;
    }

    public function addSkuValue(SkuValue $skuValue): self
    {
        if (!$this->skuValues->contains($skuValue)) {
            $this->skuValues->add($skuValue);
            $skuValue->setSku($this);
        }

        return $this;
    }

    public function removeSkuValue(SkuValue $skuValue): self
    {
        if ($this->skuValues->removeElement($skuValue)) {
            // set the owning side to null (unless already changed)
            if ($skuValue->getSku() === $this) {
                $skuValue->setSku(null);
            }
        }

        return $this;
    }
}
