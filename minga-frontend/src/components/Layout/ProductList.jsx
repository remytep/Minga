import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import Product from "./Product";

// cart context
import { CartContext } from "../../contexts/CartContext";
import { ENTRYPOINT } from "../../config";

function ProductList({ product }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${ENTRYPOINT}/products`,
      headers: { "content-type": "application/json" },
    }).then((response) => {
      setProducts(response.data["hydra:member"]);
      console.log(response.data["hydra:member"]);
    });
  }, []);

  // product value
  return (
    <>
      {products.map((product) => {
        return (
          <div key={product.slug}>
            <Product product={product} />
          </div>
        );
      })}
    </>
  );
}

export default ProductList;
