import React, { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../components/HomePage/Hero";

import ProductGrid from "../components/utils/ProductGrid";

function Accueil() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://localhost:8000/api/products",
      headers: { "content-type": "application/json" },
    }).then((response) => {
      setProducts(response.data["hydra:member"]);
    });
    axios({
      method: "GET",
      url: "https://localhost:8000/api/products?featured=true",
      headers: { "content-type": "application/json" },
    }).then((response) => {
      setFeaturedProducts(response.data["hydra:member"]);
    });
  }, []);
  return (
    <>
      <Hero />
      <main className="flex flex-col px-5 md:px-6 lg:px-10 xl:px-16">
        <div className="">
          <h2 className="text-2xl font-bold py-3">Most Popular</h2>
          <ProductGrid products={products} />
        </div>
        <div className="">
          <h2 className="text-2xl font-bold py-3">Featured</h2>
          <ProductGrid products={featuredProducts} />
        </div>
      </main>
    </>
  );
}

export default Accueil;
