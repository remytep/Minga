import React from "react";

import Hero from "../components/HomePage/Hero";
import Sidebar from "../components/Layout/Sidebar";

import ProductList from "../components/HomePage/ProductGrid";

function Accueil() {
  return (
    <>
      <section>
        <Hero />
      </section>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col">
          <ProductList />
        </div>
      </div>
    </>
  );
}

export default Accueil;
