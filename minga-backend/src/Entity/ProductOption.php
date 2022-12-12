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
#[UniqueEntity('name')]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(normalizationContext: ['groups' => ['product_option.read', 'product_option.item.read']]),
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
    #[ORM\JoinColumn()]
    #[Groups(['product_option.read'])]
    private ?Product $product = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product_option.read', 'product_option.write', 'product.read', 'product.write', 'product.item.get'])]
    private ?string $name = null;

    public function __construct()
    {
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

}
