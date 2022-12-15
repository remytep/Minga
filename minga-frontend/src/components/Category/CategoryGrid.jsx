import React, { useEffect, useState } from "react";
import Product from "../utils/ProductCard";

function CategoryGrid({ products, category }) {
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

export default CategoryGrid;
