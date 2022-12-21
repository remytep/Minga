import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductGrid({ products, category, subcategory }) {
  //console.log(products);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
      {products.length > 0 ? (
        <>
          {products.map((product) => {
            return (
              <Link
                to={`/${
                  category
                    ? category
                    : product.productSubCategory.productCategory.name
                }/${
                  subcategory ? subcategory : product.productSubCategory.name
                }/${product.slug}`}
                className="flex flex-col justify-between group-hover:opacity-75"
                key={product.slug}
              >
                <ProductCard
                  product={product}
                  subcategory={subcategory}
                  category={category}
                />
              </Link>
            );
          })}
        </>
      ) : (
        <div className="text-xl text-gray-300">No products found</div>
      )}
    </div>
  );
}

export default ProductGrid;
