<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Link;
use App\Repository\ProductOptionRepository;
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
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ProductOptionRepository::class)]

#[ApiResource(
    normalizationContext: ['groups' => ['product_option.read']],
    denormalizationContext: ['groups' => ['product_option.write']],
    operations: [
        new GetCollection(),
        new Get(normalizationContext: ['groups' => ['product_option.read', 'product_option.item.read']]),
        new Put(),
        new Post(),
        new Patch(),
        new Delete()
    ]
)]
#[ApiResource(
    uriTemplate: '/product/{productId}/options',
    uriVariables: [
        'productId' => new Link(fromClass: Product::class, toProperty: 'product'),
    ],
    operations: [new GetCollection(normalizationContext: ['groups' => ['product_option.read']],)],

)]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial', 'productOptionValues.value' => 'exact'])]
class ProductOption
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product_option.read', 'product_option.write', 'product.read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'productOptions')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['product_option.read'])]
    private ?Product $product = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product_option.read', 'product_option.write', 'product.read', 'product.write'])]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'product_option', targetEntity: ProductOptionValue::class, cascade: ["persist"])]
    #[Groups(['product_option.read', 'product_option.write', 'product.read'])]
    #[Assert\Valid()]
    private Collection $productOptionValues;

    public function __construct()
    {
        $this->productOptionValues = new ArrayCollection();
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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, ProductOptionValue>
     */
    public function getProductOptionValues(): Collection
    {
        return $this->productOptionValues;
    }

    public function addProductOptionValue(ProductOptionValue $productOptionValue): self
    {
        if (!$this->productOptionValues->contains($productOptionValue)) {
            $this->productOptionValues->add($productOptionValue);
            $productOptionValue->setProductOption($this);
        }

        return $this;
    }

    public function removeProductOptionValue(ProductOptionValue $productOptionValue): self
    {
        if ($this->productOptionValues->removeElement($productOptionValue)) {
            // set the owning side to null (unless already changed)
            if ($productOptionValue->getProductOption() === $this) {
                $productOptionValue->setProductOption(null);
            }
        }

        return $this;
    }
}
