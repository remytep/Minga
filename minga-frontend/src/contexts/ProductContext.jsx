import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const ProductContext = createContext();
 
function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const response = await axios({
                method: 'GET',
                url: "https://localhost:8000/api/products",
                headers: { "content-type": "application/json" },
            });
            setProducts(Object.values(response.data["hydra:member"]));
        };
        getProducts();
    }, [])
    return (
        <ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>
    )
}

export default ProductProvider
