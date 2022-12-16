import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductGrid({ products, category }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
      {products.map((product) => {
        return (
          <div key={product.slug}>
            <ProductCard product={product} category={category} />
          </div>
        );
      })}
    </div>
  );
}

export default ProductGrid;
