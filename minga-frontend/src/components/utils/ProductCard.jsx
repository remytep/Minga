import React from "react";
function ProductCard({ product }) {
  let min = 0;
  let stock = 0;
  product.skus.forEach((sku) => {
    stock += sku.stock;
    if (min < sku.price) {
      min = sku.price;
    }
  });

  if (stock >= 10) {
    stock = <p className="text-green-600 font-semibold">In stock</p>;
  } else if (stock > 0) {
    stock = <p className="text-orange-500 font-semibold">Few left</p>;
  } else {
    stock = <p className="text-red-600 font-semibold">Out of stock</p>;
  }
  return (
    <>
      <img className="object-contain" src="/product.webp" alt="" />
      <div className="flex-1 flex flex-col gap-3 py-3 justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-xl">{product.name}</h3>
            {product.featured ? (
              <p className="text-gray-700 text-sm">Featured</p>
            ) : null}
          </div>
          <p className="text-gray-500 text-sm">{product.shortDescription}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            Starting from <span className="font-semibold">{min} €</span>
          </div>
          <div className="text-xs bg-gray-100 px-3 py-1 rounded-full">
            {stock}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
