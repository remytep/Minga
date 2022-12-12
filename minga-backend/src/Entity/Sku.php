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
    #[Groups(['sku.read', 'product_option_value.read'])]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['sku.read', 'sku.write'])]
    private ?Product $product = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['sku.read', 'sku.write'])]
    private ?ProductOption $productOption = null;

    #[ORM\Column]
    #[Groups(['sku.read', 'sku.write'])]
    private ?string $optionValue = null;

    #[ORM\Column]
    #[Groups(['sku.read', 'sku.write','product_option_value.read'])]
    private ?int $price = null;

    #[ORM\Column]
    #[Groups(['sku.read', 'sku.write', 'product_option_value.read'])]
    private ?int $stock = null;

    #[ORM\Column(length: 255)]
    #[Groups(['sku.read', 'sku.write', 'product_option_value.read'])]
    private ?string $referenceNumber = null;

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

    public function getProductOption(): ?ProductOption
    {
        return $this->productOption;
    }

    public function setProductOption(?ProductOption $productOption): self
    {
        $this->productOption = $productOption;

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

    public function getOptionValue(): ?string
    {
        return $this->optionValue;
    }

    public function setOptionValue(string $optionValue): self
    {
        $this->optionValue = $optionValue;

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
}
