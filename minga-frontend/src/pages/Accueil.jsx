import React, { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../components/HomePage/Hero";

import ProductCarousel from "../components/utils/ProductCarousel";

function Accueil() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://localhost:8000/api/products/popular",
      headers: { "content-type": "application/json" },
    }).then((response) => {
      setProducts(response.data["hydra:member"].slice(0, 6));
    });
    axios({
      method: "GET",
      url: "https://localhost:8000/api/products/?featured=true",
      headers: { "content-type": "application/json" },
    }).then((response) => {
      setFeaturedProducts(response.data["hydra:member"].slice(0, 6));
    });
  }, []);
  return (
    <>
      <Hero />
      <main className="flex flex-col">
        <div className="">
          <h2 className="text-2xl font-bold py-3 px-5 md:px-6 lg:px-10 xl:px-16">
            Most Popular
          </h2>
          <ProductCarousel products={products} featured={false} />
        </div>
        <div className="">
          <h2 className="text-2xl font-bold py-3 px-5 md:px-6 lg:px-10 xl:px-16">
            Featured
          </h2>
          <ProductCarousel products={featuredProducts} featured={true} />
        </div>
      </main>
    </>
  );
}

export default Accueil;
