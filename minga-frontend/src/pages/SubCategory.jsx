import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductGrid from "../components/utils/ProductGrid";
import Filter from "../components/utils/Filter";

function SubCategory() {
  let { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://localhost:8000/api/product_sub_categories/" + subcategory,
      headers: { "content-type": "application/json" },
    }).then((response) => {
      console.log(response.data.products);
      setProducts(response.data.products);
    });
  }, [subcategory]);
  return (
    <main className="flex flex-col px-5 md:px-6 lg:px-10 xl:px-16">
      <Filter
        pageName={subcategory
          .replace("-", " ")
          .split(" ")
          .map(
            (element) =>
              element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
          )
          .join(" ")}
      >
        <ProductGrid
          products={products}
          category={category}
          subcategory={subcategory}
          featured={true}
        />
      </Filter>
    </main>
  );
}

export default SubCategory;
