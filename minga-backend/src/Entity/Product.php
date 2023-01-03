<?php

namespace App\Entity;


use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use App\Controller\Product\UploadFileController;
use App\Controller\Product\UpdateFileController;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\Link;
use App\Repository\ProductRepository;
use App\Entity\ProductSubCategory;
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
use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Constraints\Length;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[UniqueEntity('slug')]
#[ApiResource(
    order: ["featured" => "DESC"],
    paginationEnabled: false,
    operations: [
        new GetCollection(),
        new GetCollection(name: "get_popular", uriTemplate: 'products/popular', order: ["viewCount" => "DESC"]),
        new Get(),
        new Put(controller: UpdateFileController::class, deserialize: false),
        new Post(controller: UploadFileController::class, deserialize: false),
        new Patch(),
        new Delete()
    ],
    normalizationContext: ['groups' => ['product.read', 'product_sub_category.item.get']],
    denormalizationContext: ['groups' => ['product.write', 'product_sub_category.item.get']],
)]
/* #[ApiResource(
    uriTemplate: '/product_sub_category/{ProductSubCategoryId}/products',
    uriVariables: [
        'ProductSubCategoryId' => new Link(fromClass: ProductSubCategory::class, toProperty: 'ProductSubCategory'),
    ],
    operations: [new GetCollection()]
)] */
#[ApiFilter(BooleanFilter::class, properties: ['featured'])]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial', 'ProductSubCategory.name' => 'partial', 'productOptions.name' => 'exact',  'productOptions.productOptionValues.value' => 'exact', 'slug' => 'exact'])]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product.read'])]
    #[ApiProperty(identifier: false)]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product.read', 'product.write', 'product_sub_category.item.get', 'product_option.read', 'sku.read', 'sku_value.read']), Length(min: 3)]
    private ?string $name = null;

    #[ORM\Column(length: 255, unique: true)]
    #[ApiProperty(identifier: true)]
    #[Groups(['product.read', 'product.write', 'product_sub_category.item.get', 'sku.read', 'sku_value.read'])]
    private ?string $slug = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['product.read', 'product.write', 'product_sub_category.item.get', 'sku.read', 'sku_value.read']), Length(min: 10)]
    private ?string $description = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['product.read', 'product_sub_category.item.get'])]
    private ?\DateTimeInterface $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['product.read', 'product.write', 'product_sub_category.item.get', 'sku.read', 'sku_value.read'])]
    private ?ProductSubCategory $productSubCategory;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: ProductOption::class, cascade: ["persist"], orphanRemoval: true)]
    #[Groups(['product.read', 'sku_value.read', 'product.write'])]
    #[Assert\Valid()]
    private Collection $productOptions;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: Sku::class, orphanRemoval: true)]
    #[Groups(['product.read', "product_sub_category.item.get"])]
    private Collection $skus;

    #[ORM\Column(nullable: true)]
    #[Groups(['product.read', 'product.write', 'product_sub_category.item.get'])]
    private ?bool $featured = null;

    #[ORM\Column(length: 255, nullable: false)]
    #[Groups(['product.read', 'product.write', 'product_sub_category.item.get'])]
    private ?string $thumbnail = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['product.read'])]
    private ?int $viewCount = null;


    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->productOptions = new ArrayCollection();
        $this->skus = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getProductSubCategory(): ?ProductSubCategory
    {
        return $this->productSubCategory;
    }

    public function setProductSubCategory(?ProductSubCategory $productSubCategory): self
    {
        $this->productSubCategory = $productSubCategory;

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

    #[SerializedName('shortDescription')]
    #[Groups(['product_sub_category.item.get'])]
    public function getShortDescription(): string
    {
        if (strlen($this->description) < 100) {
            return $this->description;
        }
        return substr($this->description, 0, 100) . '...';
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

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

    /**
     * @return Collection<int, ProductOption>
     */
    public function getProductOptions(): Collection
    {
        return $this->productOptions;
    }

    public function addProductOption(ProductOption $productOption): self
    {
        if (!$this->productOptions->contains($productOption)) {
            $this->productOptions->add($productOption);
            $productOption->setProduct($this);
        }

        return $this;
    }

    public function removeProductOption(ProductOption $productOption): self
    {
        if ($this->productOptions->removeElement($productOption)) {
            // set the owning side to null (unless already changed)
            if ($productOption->getProduct() === $this) {
                $productOption->setProduct(null);
            }
        }

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
            $sku->setProduct($this);
        }

        return $this;
    }

    public function removeSku(Sku $sku): self
    {
        if ($this->skus->removeElement($sku)) {
            // set the owning side to null (unless already changed)
            if ($sku->getProduct() === $this) {
                $sku->setProduct(null);
            }
        }

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function isFeatured(): ?bool
    {
        return $this->featured;
    }

    public function setFeatured(?bool $featured): self
    {
        $this->featured = $featured;

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

    public function getViewCount(): ?int
    {
        return $this->viewCount;
    }

    public function setViewCount(int $viewCount): self
    {
        $this->viewCount = $viewCount;

        return $this;
    }
}
