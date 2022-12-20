import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductGrid from "../components/utils/ProductGrid";

function Category() {
  let { category } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://localhost:8000/api/product_categories/" + category,
      headers: { "content-type": "application/json" },
    }).then((response) => {
      console.log(response.data.products);
      setProducts(response.data.products);
    });
  }, [category]);
  return (
    <>
      <div className="flex">
        <div className="flex flex-col">
          <ProductGrid products={products} category={category} />
        </div>
      </div>
    </>
  );
}

export default Category;
