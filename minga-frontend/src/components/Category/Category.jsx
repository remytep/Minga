import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Product from "../homePage/Product";

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
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
      {products.map((product) => {
        return (
          <div key={product.slug}>
            <Product product={product} category={category} />
          </div>
        );
      })}
    </div>
  );
}

export default Category;
