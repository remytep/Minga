<?php

namespace App\Entity;

use App\Repository\SKUValuesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SKUValuesRepository::class)]
class SKUValues
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product = null;

    #[ORM\ManyToOne]
    private ?SKU $sku = null;

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

    public function getSku(): ?SKU
    {
        return $this->sku;
    }

    public function setSku(?SKU $sku): self
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
