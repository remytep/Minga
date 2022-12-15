import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";

function ProductCard({ product, category }) {
  let cat;
  if (category) {
    cat = category;
  } else {
    cat = product.productCategory.name;
  }
  return (
    <>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transion">
        {/* product image */}
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[170px] group-hover:scale-110 transition duration-300"
              src={product.thumbnail}
              alt=""
            />
          </div>
        </div>
        {/* product icon */}
        <div className="absolute top-2 -right-11 group-hover:right-2 p-1 gap-y-1 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button /* onClick={() => addToCart(product, id)} */>
            <div className="flex justify-center items-center bg-red-500 text-white w-8 h-8">
              <BsPlus className="text-2xl" />
            </div>
          </button>
          <Link
            to={`/${cat}/${product.slug}`}
            className="w-8 h-8 flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div className="text-left">
        <div className="text-sm capitalize text-grey-500 font-semibold opacity-50 mb-1">
          {product.productCategory.name}
        </div>
        <Link to={`/${cat}/${product.slug}`}>
          <h3 className="font-semibold opacity-90 mb-1">{product.name}</h3>
        </Link>
      </div>
    </>
  );
}

export default ProductCard;
