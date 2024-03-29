<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;
use App\Controller\Sku\UploadFileController;
use App\Controller\Sku\UpdateFileController;
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
    paginationEnabled: false,
    normalizationContext: ['groups' => ['sku.read']],
    denormalizationContext: ['groups' => ['sku.write']],
    operations: [
        new GetCollection(),
        new Get(),
        new Put(controller: UpdateFileController::class, deserialize: false),
        new Post(controller: UploadFileController::class, deserialize: false),
        new Patch(),
        new Delete()
    ]
)]
#[ApiFilter(SearchFilter::class, properties: ['skuValues' => 'exact', 'product' => 'exact'])]
class Sku
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['sku.read', 'product.read', 'order.read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'skus')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['sku.read', 'sku.write', 'order.read', 'order.read'])]
    private ?Product $product = null;

    #[ORM\Column]
    #[Groups(['sku.read', 'sku.write', 'product.read', 'product_sub_category.read', 'order.read'])]
    private ?float $price = null;

    #[ORM\Column]
    #[Groups(['sku.read', 'sku.write', 'product.read', 'product_sub_category.read', 'order.read'])]
    private ?int $stock = null;

    #[ORM\Column(length: 255)]
    #[Groups(['sku.read', 'sku.write', 'product.read', 'order.read'])]
    private ?string $referenceNumber = null;

    #[ORM\OneToMany(mappedBy: 'Sku', targetEntity: SkuValue::class, cascade: ['persist'], orphanRemoval: true)]
    #[Groups(['sku.read', 'sku.write', 'product.read', 'order.read'])]
    private Collection $skuValues;

    #[ORM\Column(length: 255)]
    #[ApiProperty(
        types: ['https://schema.org/image'],
        openapi_context: [
            "type" => "string",
        ]
    )]
    #[Groups(['sku.read', 'sku.write', 'product.read', 'order.read', 'product_sub_category.read'])]
    private ?string $thumbnail = null;

    #[ORM\Column]
    #[Groups(['sku.read', 'sku.write', 'product.read', 'order.read'])]
    private ?float $weight = null;

    #[ORM\Column]
    #[Groups(['sku.read', 'sku.write', 'product.read', 'order.read', 'product_sub_category.read'])]
    private ?int $discountPercent = null;


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

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
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
        return $this->referenceNumber;
    }

    public function setReferenceNumber(string $referenceNumber): self
    {
        $this->referenceNumber = $referenceNumber;

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

    public function getThumbnail(): ?string
    {
        return $this->thumbnail;
    }

    public function setThumbnail(string $thumbnail): self
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }

    public function getWeight(): ?float
    {
        return $this->weight;
    }

    public function setWeight(float $weight): self
    {
        $this->weight = $weight;

        return $this;
    }

    public function getDiscountPercent(): ?int
    {
        return $this->discountPercent;
    }

    public function setDiscountPercent(?int $discountPercent): self
    {
        $this->discountPercent = $discountPercent;

        return $this;
    }
}
