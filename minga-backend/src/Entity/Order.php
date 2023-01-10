<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiFilter;
use App\Repository\OrderRepository;
use DateTime;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
#[ApiResource(
    paginationEnabled: false,
    normalizationContext: ['groups' => ['order.read']],
    denormalizationContext: ['groups' => ['order.write']]
),]
#[ApiFilter(SearchFilter::class, properties: ['status' => 'exact'])]
class Order
{

    /**
     * An order that is in progress, not placed yet.
     *
     * @var string
     */
    const STATUS_CART = 'CART';


    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['order.read', 'order.write'])]
    private ?string $orderNumber = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[Groups(['order.read', 'order.write'])]
    private ?User $user = null;

    #[ORM\Column]
    #[Groups(['order.read', 'order.write'])]
    private ?int $totalAmount = 0;

    #[ORM\OneToMany(mappedBy: 'orderNumber', targetEntity: OrderItem::class, orphanRemoval: true)]
    #[Groups(['order.read', 'order.write'])]
    private Collection $orderItems;

    #[ORM\Column(length: 255)]
    #[Groups(['order.read', 'order.write'])]
    private ?string $status = self::STATUS_CART;

    #[ORM\Column]
    #[Groups(['order.read', 'order.write'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    #[Groups(['order.read', 'order.write'])]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['order.read', 'order.write'])]
    private ?string $stripeCustomerId = null;

    public function __construct()
    {
        $this->orderItems = new ArrayCollection();
        $this->createdAt = new DateTimeImmutable('now');
        $this->updatedAt = new DateTimeImmutable('now');
    }

    /**
     * Calculates the order total.
     *
     * @return float
     */
    public function getTotal(): float
    {
        $total = 0;

        foreach ($this->getOrderItems() as $item) {
            $total += $item->getTotal();
        }

        return $total;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOrderNumber(): ?string
    {
        return $this->orderNumber;
    }

    public function setOrderNumber(string $orderNumber): self
    {
        $this->orderNumber = $orderNumber;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getTotalAmount(): ?int
    {
        return $this->totalAmount;
    }

    public function setTotalAmount(int $totalAmount): self
    {
        $this->totalAmount = $totalAmount;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection<int, orderItem>
     */
    public function getOrderItems(): Collection
    {
        return $this->orderItems;
    }

    public function addOrderItem(OrderItem $orderItem): self
    {
        /*     if (!$this->orderItems->contains($orderItem)) {
            $this->orderItems->add($orderItem);
            $orderItem->setOrderNumber($this);
        }
*/
        foreach ($this->getOrderItems() as $existingItem) {
            if ($existingItem->equals($orderItem)) {
                $existingItem->setQuantity(
                    $existingItem->getQuantity() + $orderItem->getQuantity()
                );
                return $this;
            }
        }
        $this->orderItems[] = $orderItem;
        $orderItem->setOrderNumber($this);

        return $this;
    }

    public function removeOrderItem(OrderItem $orderItem): self
    {
        /*        if ($this->orderItems->removeElement($orderItem)) {
            // set the owning side to null (unless already changed)
            if ($orderItem->getOrderNumber() === $this) {
                $orderItem->setOrderNumber(null);
            }
        } */
        foreach ($this->getOrderItems() as $orderItem) {
            $this->orderItems->removeElement($orderItem);
            if ($orderItem->getOrderNumber() === $this) {
                $orderItem->setOrderNumber(null);
            }
        }

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getStripeCustomerId(): ?string
    {
        return $this->stripeCustomerId;
    }

    public function setStripeCustomerId(?string $stripeCustomerId): self
    {
        $this->stripeCustomerId = $stripeCustomerId;

        return $this;
    }
}
