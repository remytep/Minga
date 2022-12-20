import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, matchRoutes } from "react-router-dom";
import ProductCard from "../components/utils/ProductCard";
import ProductGrid from "../components/utils/ProductGrid";

function Search() {
  const { searchTerms } = useParams();
  const [products, setProducts] = useState(null);
  useEffect(() => {
    if (searchTerms) {
      setProducts([]);
      axios({
        method: "GET",
        url: "https://localhost:8000/api/products?name=" + searchTerms,
        headers: { "content-type": "application/json" },
      }).then((response) => {
        setProducts(response.data["hydra:member"]);
      });
    }
  }, [searchTerms]);
  return (
    <>
      {products ? (
        <main className="flex flex-col px-5 md:px-6 lg:px-10 xl:px-16">
          <ProductGrid products={products} />
        </main>
      ) : (
        <div className="flex justify-center items-center h-[90vh]">
          Search terms are empty
        </div>
      )}
    </>
  );
}

export default Search;
