<?php

namespace App\Entity;

use App\Repository\SKURepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SKURepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read']],
    denormalizationContext: ['groups' => ['write']],
)]
class SKU
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read', 'write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read', 'write'])]
    private ?string $sku_code = null;

    #[ORM\Column]
    #[Groups(['read', 'write'])]
    private ?int $price = null;

    #[ORM\Column]
    #[Groups(['read', 'write'])]
    private ?int $in_stock = null;

    #[ORM\OneToMany(mappedBy: 'SKU', targetEntity: SKUValues::class)]
    private Collection $sku_values;

    #[ORM\ManyToOne(inversedBy: 'SKUs')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product = null;

    public function __construct()
    {
        $this->sKUValues = new ArrayCollection();
        $this->sku_values = new ArrayCollection();
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

    public function getSkuCode(): ?string
    {
        return $this->sku_code;
    }

    public function setSkuCode(string $sku_code): self
    {
        $this->name = $sku_code;
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

    public function getInStock(): ?int
    {
        return $this->in_stock;
    }

    public function setInStock(int $in_stock): self
    {
        $this->in_stock = $in_stock;

        return $this;
    }

    /**
     * @return Collection<int, SKUValues>
     */
    public function getSkuValues(): Collection
    {
        return $this->sku_values;
    }

    public function addSkuValue(SKUValues $skuValue): self
    {
        if (!$this->sku_values->contains($skuValue)) {
            $this->sku_values->add($skuValue);
            $skuValue->setSKU($this);
        }

        return $this;
    }

    public function removeSkuValue(SKUValues $skuValue): self
    {
        if ($this->sku_values->removeElement($skuValue)) {
            // set the owning side to null (unless already changed)
            if ($skuValue->getSKU() === $this) {
                $skuValue->setSKU(null);
            }
        }

        return $this;
    }
}
