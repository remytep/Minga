<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SkuRepository;
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

#[ORM\Entity(repositoryClass: SkuRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['sku.read']],
    denormalizationContext: ['groups' => ['sku.write']],
    operations: [
        new GetCollection(security: 'is_granted("ROLE_ADMIN")', openapiContext: [
            'security' => [['bearerAuth' => []]]
        ]),
        new Get(),
        new Put(security: 'is_granted("ROLE_ADMIN")', openapiContext: [
            'security' => [['bearerAuth' => []]]
        ]),
        new Post(security: 'is_granted("ROLE_ADMIN")', openapiContext: [
            'security' => [['bearerAuth' => []]]
        ]),
        new Patch(security: 'is_granted("ROLE_ADMIN")', openapiContext: [
            'security' => [['bearerAuth' => []]]
        ]),
        new Delete(security: 'is_granted("ROLE_ADMIN")', openapiContext: [
            'security' => [['bearerAuth' => []]]
        ])
    ]
)]
class Sku
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['sku.read', 'product.read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'skus')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['sku.read'])]
    private ?Product $product = null;

    #[ORM\Column]
    #[Groups(['sku.read', 'product.read'])]
    private ?int $price = null;

    #[ORM\Column]
    #[Groups(['sku.read', 'product.read'])]
    private ?int $stock = null;

    #[ORM\Column(length: 255)]
    #[Groups(['sku.read', 'product.read'])]
    private ?string $reference_number = null;

    #[ORM\OneToMany(mappedBy: 'Sku', targetEntity: SkuValue::class)]
    #[Groups(['sku.read', 'product.read'])]
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