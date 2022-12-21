import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductGrid({ products, category }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
      {products.map((product) => {
        return (
          <Link
            to={`/${category ? category : product.ProductSubCategory.name}/${
              product.slug
            }`}
            className="flex flex-col justify-between group-hover:opacity-75"
            key={product.slug}
          >
            <ProductCard product={product} category={category} />
          </Link>
        );
      })}
    </div>
  );
}

export default ProductGrid;
