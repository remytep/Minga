import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const localStoragePanier = JSON.parse(
  localStorage.getItem("Mon panier") || "[]"
);

function CartProvider({ children }) {
  // cart state
  const [cart, setCart] = useState(localStoragePanier);

  // total price state
  const [total, setTotal] = useState(0);

  // item amount state
  const [itemAmount, setItemAmount] = useState(0);

  useEffect(() => {
    // update total amount
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }

    // total price
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);

    localStorage.setItem("Mon panier", JSON.stringify(cart));
  }, [cart]);

  // add to cart
  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    // check if item is already in cart
    const cartItem = cart.find((item) => {
      return item.id === id;
    });

    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // delete item from cart
  const deleteItem = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  // increase amount
  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  };

  // decrease amount
  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }

    if (cartItem.amount < 2) {
      deleteItem(id);
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.clear();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteItem,
        increaseAmount,
        decreaseAmount,
        clearCart,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
