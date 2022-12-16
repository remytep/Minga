import React, { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../components/HomePage/Hero";
import Sidebar from "../components/Layout/Sidebar";

import ProductGrid from "../components/utils/ProductGrid";

function Accueil() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://localhost:8000/api/products",
      headers: { "content-type": "application/json" },
    }).then((response) => {
      setProducts(response.data["hydra:member"]);
    });
  }, []);
  return (
    <>
      <section>
        <Hero />
      </section>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col">
          <ProductGrid products={products} />
        </div>
      </div>
    </>
  );
}

export default Accueil;
