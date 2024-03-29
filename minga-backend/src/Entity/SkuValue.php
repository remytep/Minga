<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SkuValueRepository;
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

#[ORM\Entity(repositoryClass: SkuValueRepository::class)]
#[ApiResource(
    paginationEnabled: false,
    normalizationContext: ['groups' => ['sku_value.read']],
    denormalizationContext: ['groups' => ['sku_value.write']],
    operations: [
        new GetCollection(),
        new Get(),
        new Put(),
        new Post(),
        new Patch(),
        new Delete()
    ]
)]
#[ApiFilter(SearchFilter::class, properties: ['productOptionValue' => 'exact'])]
class SkuValue
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['sku_value.read'])]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['sku_value.read', 'sku_value.write'])]
    private ?Product $product = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['sku_value.read', 'sku.read', 'sku_value.write', 'order.read'])]
    private ?ProductOption $productOption = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['sku_value.read', 'sku.read', 'sku_value.write', 'order.read'])]
    private ?ProductOptionValue $productOptionValue = null;

    #[ORM\ManyToOne(inversedBy: 'skuValues')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['sku_value.read', 'sku_value.write'])]
    private ?Sku $Sku = null;

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

    public function getProductOptionValue(): ?ProductOptionValue
    {
        return $this->productOptionValue;
    }

    public function setProductOptionValue(?ProductOptionValue $productOptionValue): self
    {
        $this->productOptionValue = $productOptionValue;

        return $this;
    }

    public function getSku(): ?Sku
    {
        return $this->Sku;
    }

    public function setSku(?Sku $Sku): self
    {
        $this->Sku = $Sku;

        return $this;
    }
}
