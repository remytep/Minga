<?php

namespace App\Entity;

use App\Repository\ProductOptionValueRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductOptionValueRepository::class)]
class ProductOptionValue
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'productOptionValues')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ProductOption $product_option = null;

    #[ORM\ManyToOne(inversedBy: 'productOptionValues')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product = null;

    #[ORM\Column(length: 255)]
    private ?string $value = null;


    public function getId(): ?int
    {
        return $this->id;
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

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): self
    {
        $this->value = $value;

        return $this;
    }
}
