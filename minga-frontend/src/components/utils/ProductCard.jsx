import React from "react";
function ProductCard({ product, featured }) {
  //console.log(product.skus);
  let sale = 0;
  let originalPrice;
  let min =
    (product.skus[0].price * (100 - product.skus[0].discountPercent)) / 100;
  let stock = 0;
  product.skus.forEach((sku) => {
    stock += sku.stock;
    if (sku.discountPercent > 0) {
      sale = sku.discountPercent;
    }
    if (min > (sku.price * (100 - sku.discountPercent)) / 100) {
      originalPrice = sku.price;
      min = (sku.price * (100 - sku.discountPercent)) / 100;
    }
  });

  if (stock >= 10) {
    stock = <p className="text-green-600 font-semibold">In stock</p>;
  } else if (stock > 0) {
    stock = <p className="text-orange-500 font-semibold">Few left</p>;
  } else {
    stock = <p className="text-red-600 font-semibold">Out of stock</p>;
  }

  console.log(product)
  return (
    <>
      <div className="relative">
        <img
          className="object-cover h-full sm:h-[20rem] md:h-[28rem] lg:h-[24rem] xl:h-[40rem]"
          src={`http://localhost:8000/uploads/${product.thumbnail}`}
          alt=""
        />
        {sale !== 0 ? (
          <div className="absolute bottom-0 flex w-full justify-between">
            <p className="text-white bg-opacity-90 bg-red-600 px-2 py-1 flex items-center">
              Discount
            </p>
            <p className="bg-gray-200 bg-opacity-50 flex-1 text-right px-2 py-1 text-xl">
              -{sale}%
            </p>
          </div>
        ) : null}
      </div>
      <div className="flex-1 flex flex-col gap-3 py-3 justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-xl">{product.name}</h3>
            {featured && product.featured ? (
              <p className="text-gray-700 text-sm">Featured</p>
            ) : null}
          </div>
          <p className="text-gray-500 text-sm">{product.shortDescription}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            {sale === 0 ? (
              <>
                Starting from <br />
                <span className="font-semibold text-lg">{min} €</span>
              </>
            ) : (
              <>
                Starting from <br />
                <span className="font-semibold text-md line-through text-gray-400">
                  {min} €
                </span>
                &nbsp;
                <span className="font-semibold text-lg text-red-600">
                  {min} €
                </span>
              </>
            )}
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
