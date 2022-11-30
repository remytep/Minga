<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SkuValueRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SkuValueRepository::class)]
#[ApiResource]
class SkuValue
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?ProductOption $product_option = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?ProductOptionValue $product_option_value = null;

    #[ORM\ManyToOne(inversedBy: 'skuValues')]
    #[ORM\JoinColumn(nullable: false)]
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
