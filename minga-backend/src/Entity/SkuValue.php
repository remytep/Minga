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
#[ApiFilter(SearchFilter::class, properties: ['product_option_value' => 'exact'])]
class SkuValue
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['sku_value.read'])]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['sku_value.read'])]
    private ?Product $product = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['sku_value.read'])]
    private ?ProductOption $product_option = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['sku_value.read'])]
    private ?ProductOptionValue $product_option_value = null;

    #[ORM\ManyToOne(inversedBy: 'skuValues')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['sku_value.read'])]
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
        return $this->product_option;
    }

    public function setProductOption(?ProductOption $product_option): self
    {
        $this->product_option = $product_option;

        return $this;
    }

    public function getProductOptionValue(): ?ProductOptionValue
    {
        return $this->product_option_value;
    }

    public function setProductOptionValue(?ProductOptionValue $product_option_value): self
    {
        $this->product_option_value = $product_option_value;

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
