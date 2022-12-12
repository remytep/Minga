<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Link;
use App\Repository\ProductRepository;
use App\Entity\ProductCategory;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Constraints\Length;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource(
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
    ],
    normalizationContext: ['groups' => ['product.read', 'product_category.item.get']],
    denormalizationContext: ['groups' => ['product.write', 'product_category.item.get']],
)]
#[ApiResource(
    uriTemplate: '/product_category/{productCategoryId}/products',
    uriVariables: [
        'productCategoryId' => new Link(fromClass: ProductCategory::class, toProperty: 'productCategory'),
    ],
    operations: [new GetCollection()]
)]

#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial', 'productCategory.name' => 'exact', 'productOptions.name' => 'exact',  'productOptions.productOptionValues.value' => 'exact'])]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product.read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product.read', 'product.write', 'product_category.item.get', 'product_option.read']), Length(min: 3)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['product.write', 'product_category.item.get']), Length(min: 10)]
    private ?string $description = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['product.read', 'product.write', 'product_category.item.get'])]
    private ?string $thumbnail = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['product.read', 'product_category.item.get'])]
    private ?\DateTimeInterface $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['product.read', 'product.write'])]
    private ?ProductCategory $productCategory;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: Sku::class, cascade: ["persist"])]
    #[Groups(['product.read'])]
    #[Assert\Valid()]
    private Collection $skus;

    #[ORM\Column(length: 255)]
    #[Groups(['product.read', 'product.write'])]
    private ?string $slug = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->skus = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getProductCategory(): ?ProductCategory
    {
        return $this->productCategory;
    }

    public function setProductCategory(?ProductCategory $productCategory): self
    {
        $this->productCategory = $productCategory;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }


    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getThumbnail(): ?string
    {
        return $this->thumbnail;
    }

    public function setThumbnail(string $thumbnail): self
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    /*     public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    } */

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

        /**
     * @return Collection<int, Sku>
     */
    public function getSkus(): Collection
    {
        return $this->skus;
    }

    public function addSku(Sku $sku): self
    {
        if (!$this->skus->contains($sku)) {
            $this->skus->add($sku);
            $sku->setSkuCategory($this);
        }

        return $this;
    }

    public function removeSku(Sku $sku): self
    {
        if ($this->skus->removeElement($sku)) {
            // set the owning side to null (unless already changed)
            if ($sku->getSkuCategory() === $this) {
                $sku->setSkuCategory(null);
            }
        }

        return $this;
    }
}
