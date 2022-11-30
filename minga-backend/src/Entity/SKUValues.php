<?php

namespace App\Entity;

use App\Repository\SkuValuesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SkuValuesRepository::class)]
class SkuValues
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product = null;

    #[ORM\ManyToOne]
    private ?Sku $sku = null;

    #[ORM\ManyToOne]
    private ?ProductOption $product_option = null;

    #[ORM\ManyToOne]
    private ?ProductOptionValue $product_option_value = null;

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

    public function getSku(): ?Sku
    {
        return $this->sku;
    }

    public function setSku(?Sku $sku): self
    {
        $this->sku = $sku;

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
}
