import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const ProductContext = createContext();

function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async() =>{
            const response = await fetch("http://127.0.0.1:59822/api/products");
            const data = await response.json();
            setProducts(data);
            console.log(data);

        };
        fetchProducts();
    }, [])
    return (
        <ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>
    )
}

export default ProductProvider
