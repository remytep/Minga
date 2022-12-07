import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const ProductContext = createContext();

function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        // const getProducts = async () => {
        //     const response = await axios({
        //         method: 'GET',
        //         url: "https://fakestoreapi.com/products",
        //         headers: { "content-type": "application/json" },
        //     });
        //     setProducts(response.data);
        // };
        // getProducts();
    }, [])
    return (
        <ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>
    )
}

export default ProductProvider
