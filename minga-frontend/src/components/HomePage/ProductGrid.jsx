import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Product from "../utils/ProductCard";

// cart context
import { CartContext } from "../../contexts/CartContext";

function ProductList({ product }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://localhost:8000/api/products",
      headers: { "content-type": "application/json" },
    }).then((response) => {
      setProducts(response.data["hydra:member"]);
      console.log(response.data["hydra:member"]);
    });
  }, []);

  // product value
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
      {products.map((product) => {
        return (
          <div key={product.slug}>
            <Product product={product} />
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
