import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductGrid from "../components/utils/ProductGrid";
import Filter from "../components/utils/Filter";

function Search() {
  const { searchTerms } = useParams();
  const [products, setProducts] = useState(null);
  useEffect(() => {
    if (searchTerms) {
      setProducts([]);
      axios({
        method: "GET",
        url: "http://localhost:8000/api/products?name=" + searchTerms,
        headers: { "content-type": "application/json" },
      }).then((response) => {
        setProducts(response.data["hydra:member"]);
      });
    }
  }, [searchTerms]);
  return (
    <main className="flex gap-3 px-5 md:px-6 lg:px-10 xl:px-16">
      {products ? (
        <Filter pageName="Search">
          <ProductGrid products={products} />
        </Filter>
      ) : (
        <div className="flex justify-center items-center h-[90vh]">
          Search terms are empty
        </div>
      )}
    </main>
  );
}

export default Search;
