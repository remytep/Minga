import React, { createContext, useState } from 'react'

export const CartContext = createContext()

function CartProvidert({ children }) {
    // cart state
    const [cart, setCart] = useState([]);

    // add to cart
    const addToCart = (product, id) => {
        const newItem = {...product, total: 1};
        // check if item is already in cart
        const cartItem = cart.find((item) => {
            return item.id === id;
        }); 

        if(cartItem){
            const newCart = [...cart].map((item) => {
                if(item.id === id){
                    return { ...item, total: cartItem.total + 1};
                }else {
                    return item;
                }
            });
            setCart(newCart);
        }else{
            setCart([...cart, newItem]);
        }
    }

    console.log(cart);
    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvidert