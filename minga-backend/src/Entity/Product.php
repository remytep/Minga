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

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read', 'write'])]
    private ?string $photo = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['read', 'write'])]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read', 'write'])]
    private ?ProductCategory $category = null;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: ProductOption::class)]
    private Collection $productOptions;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: ProductOptionValue::class)]
    private Collection $productOptionValues;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: SKUValues::class)]
    private Collection $SKUValues;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: SKU::class)]
    #[Groups(['read', 'write'])]
    private Collection $SKUs;


    public function __construct()
    {
        $this->productOptions = new ArrayCollection();
        $this->productOptionValues = new ArrayCollection();
        $this->SKUValues = new ArrayCollection();
        $this->SKUs = new ArrayCollection();
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
        return $this->SKUValues;
    }

    public function addSKUValue(SKUValues $SKUValue): self
    {
        if (!$this->SKUValues->contains($SKUValue)) {
            $this->SKUValues->add($SKUValue);
            $SKUValue->setProduct($this);
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
        return $this->SKUs;
    }

    public function addSKUs(SKU $SKUs): self
    {
        if (!$this->sKUs->contains($SKUs)) {
            $this->sKUs->add($SKUs);
            $SKUs->setProduct($this);
        }

        return $this;
    }

    public function removeSKUs(SKU $SKUs): self
    {
        if ($this->sKUs->removeElement($SKUs)) {
            // set the owning side to null (unless already changed)
            if ($SKUs->getProduct() === $this) {
                $SKUs->setProduct(null);
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
