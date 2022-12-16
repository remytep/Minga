import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../components/utils/ProductCard";

function Search() {
  const { searchTerms } = useParams();
  const [productSearch, setProductSearch] = useState([]);
  const [productCategorySearch, setProductCategorySearch] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts([]);
    axios({
      method: "GET",
      url: "https://localhost:8000/api/products?name=" + searchTerms,
      headers: { "content-type": "application/json" },
    }).then((response) => {
      setProductSearch(response.data["hydra:member"]);
    });
    axios({
      method: "GET",
      url:
        "https://localhost:8000/api/products?productCategory.name=" +
        searchTerms,
      headers: { "content-type": "application/json" },
    }).then((response) => {
      setProductCategorySearch(response.data["hydra:member"]);
    });
  }, [searchTerms]);
  useEffect(() => {
    setProducts([
      ...new Map(
        [...productSearch, ...productCategorySearch].map((item) => [
          item.id,
          item,
        ])
      ).values(),
    ]);
  }, [productSearch, productCategorySearch]);
  return (
    <div>
      {products.map((product) => (
        <div key={product.slug}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default Search;
