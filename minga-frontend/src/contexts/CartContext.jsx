import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const CartContext = createContext();

const localStoragePanier = JSON.parse(localStorage.getItem("CART") || "[]");

function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  // cart state
  const [cart, setCart] = useState(localStoragePanier);
  const [cartIri, setCartIri] = useState(null);
  // total price state
  const [total, setTotal] = useState(0);

  // item amount state
  const [itemAmount, setItemAmount] = useState(0);
  useEffect(() => {
    if (user) {
      axios
        .post("https://localhost:8000/order", {
          user: "/api/users/" + user.id,
        })
        .then((response) => {
          //console.log(response.data);
          setCartIri("/api/orders/" + response.data.id);
        })
        .catch((error) => console.log(error));
      if (cartIri) {
        axios.get("https://localhost:8000" + cartIri).then((response) => {
          setCart(
            response.data.orderItems.map((orderItem) => {
              return { ...orderItem.sku, amount: orderItem.quantity };
            })
          );
        });
      }
    }
  }, [user, cartIri]);
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
      return (
        accumulator +
        ((currentItem.price * (100 - currentItem.discountPercent)) / 100) *
          currentItem.amount
      );
    }, 0);
    setTotal(total);

    localStorage.setItem("CART", JSON.stringify(cart));
  }, [cart, user]);

  // add to cart
  const addToCart = (product, id, amount) => {
    const newItem = { ...product, amount };
    // check if item is already in cart
    console.log(newItem);
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + amount };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      if (user) {
        axios
          .post("https://localhost:8000/order_items", {
            orderNumber: cartIri,
            sku: product["@id"],
            quantity: amount,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error));
      }
      setCart([...cart, newItem]);
    }
  };

  // delete item from cart
  const deleteItem = (id) => {
    //console.log(id);
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    axios
      .delete("https://localhost:8000/order_items", {
        data: {
          orderNumber: cartIri,
          sku: "/api/skus/" + id,
        },
      })
      .then((response) => {
        //console.log(response);
      })
      .catch((error) => console.log(error));
    setCart(newCart);
  };

  // increase amount
  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    axios
      .put("https://localhost:8000/order_items", {
        orderNumber: cartIri,
        sku: "/api/skus/" + id,
        quantity: cartItem.amount + 1,
      })
      .then((response) => {
        //console.log(response);
      })
      .catch((error) => console.log(error));
    addToCart(cartItem, id, 1);
  };

  // decrease amount
  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          axios
            .put("https://localhost:8000/order_items", {
              orderNumber: cartIri,
              sku: "/api/skus/" + id,
              quantity: cartItem.amount - 1,
            })
            .then((response) => {
              //console.log(response);
            })
            .catch((error) => console.log(error));
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
