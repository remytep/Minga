<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read']],
    denormalizationContext: ['groups' => ['write']],
)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read', 'write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read', 'write'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read', 'write'])]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read', 'write'])]
    private ?ProductCategory $category = null;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: ProductOption::class)]
    #[Groups(['read', 'write'])]
    private Collection $productOptions;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: ProductOptionValue::class)]
    #[Groups(['read', 'write'])]
    private Collection $productOptionValues;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: SKUValues::class)]
    #[Groups(['read', 'write'])]
    private Collection $sKUValues;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: SKU::class)]
    #[Groups(['read', 'write'])]
    private Collection $sKUs;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: SKU::class)]
    #[Groups(['read', 'write'])]
    private Collection $skus;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read', 'write'])]
    private ?string $photo = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['read', 'write'])]
    private ?\DateTimeImmutable $created_at = null;

    public function __construct()
    {
        $this->productOptions = new ArrayCollection();
        $this->productOptionValues = new ArrayCollection();
        $this->sKUValues = new ArrayCollection();
        $this->sKUs = new ArrayCollection();
        $this->skus = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getCategory(): ?ProductCategory
    {
        return $this->category;
    }

    public function setCategory(?ProductCategory $category): self
    {
        $this->category = $category;

        return $this;
    }

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
            $productOptionValue->setProduct($this);
        }

        return $this;
    }

    public function removeProductOptionValue(ProductOptionValue $productOptionValue): self
    {
        if ($this->productOptionValues->removeElement($productOptionValue)) {
            // set the owning side to null (unless already changed)
            if ($productOptionValue->getProduct() === $this) {
                $productOptionValue->setProduct(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, SKUValues>
     */
    public function getSKUValues(): Collection
    {
        return $this->sKUValues;
    }

    public function addSKUValue(SKUValues $sKUValue): self
    {
        if (!$this->sKUValues->contains($sKUValue)) {
            $this->sKUValues->add($sKUValue);
            $sKUValue->setProduct($this);
        }

        return $this;
    }

    public function removeSKUValue(SKUValues $sKUValue): self
    {
        if ($this->sKUValues->removeElement($sKUValue)) {
            // set the owning side to null (unless already changed)
            if ($sKUValue->getProduct() === $this) {
                $sKUValue->setProduct(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, SKU>
     */
    public function getSKUs(): Collection
    {
        return $this->sKUs;
    }

    public function addSKUs(SKU $sKUs): self
    {
        if (!$this->sKUs->contains($sKUs)) {
            $this->sKUs->add($sKUs);
            $sKUs->setProduct($this);
        }

        return $this;
    }

    public function removeSKUs(SKU $sKUs): self
    {
        if ($this->sKUs->removeElement($sKUs)) {
            // set the owning side to null (unless already changed)
            if ($sKUs->getProduct() === $this) {
                $sKUs->setProduct(null);
            }
        }

        return $this;
    }

    public function addSku(SKU $sku): self
    {
        if (!$this->skus->contains($sku)) {
            $this->skus->add($sku);
            $sku->setProduct($this);
        }

        return $this;
    }

    public function removeSku(SKU $sku): self
    {
        if ($this->skus->removeElement($sku)) {
            // set the owning side to null (unless already changed)
            if ($sku->getProduct() === $this) {
                $sku->setProduct(null);
            }
        }

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(?string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(?\DateTimeImmutable $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }
}
