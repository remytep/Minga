<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductOptionValueRepository;
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

#[ORM\Entity(repositoryClass: ProductOptionValueRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['product_option_value.read']],
    denormalizationContext: ['groups' => ['product_option_value.write']],
    operations: [
        new GetCollection(),
        new Get(),
        new Put(),
        new Post(),
        new Patch(),
        new Delete()
    ]
)]
class ProductOptionValue
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product_option_value.read', 'product_option.item.read', 'product.write', 'product_option.write'])]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['product_option_value.read', 'product.write', 'product_option.write'])]
    private ?Product $product = null;

    #[ORM\ManyToOne(inversedBy: 'productOptionValues')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['product_option_value.read', 'product.write', 'product_option.write'])]
    private ?ProductOption $product_option = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product_option_value.read', 'product_option.item.read', 'product.read', 'product.write', 'product_option.read', 'product_option.write'])]
    private ?string $value = null;

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
