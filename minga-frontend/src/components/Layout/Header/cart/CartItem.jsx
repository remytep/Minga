import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdClose, IoMdRemove, IoMdAdd } from "react-icons/io";
import { CartContext } from "../../../../contexts/CartContext";

function CartItem({ product, readonly }) {
  console.log(product);
  const { deleteItem, increaseAmount, decreaseAmount } = useContext(CartContext);

  return (
    <div className="flex bg-[#C9C5BA]">
      <img src={`${process.env.REACT_APP_UPLOADS}/${product.thumbnail}`} alt="desk" className="w-1/2" />
      <div className="flex-1 flex flex-col p-3">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <Link reloadDocument to={`/${product.product.productSubCategory.productCategory.name}/${product.product.productSubCategory.name}/${product.product.slug}`} className="text-lg">
                {product.product.name}
              </Link>
              <span className="text-xs text-gray-500">
                {product.referenceNumber}
              </span>
            </div>
            {!readonly &&
              <div
                onClick={() => deleteItem(product.id)}
                className="text-lg cursor-pointer"
              >
                <IoMdClose className="text-black hover:text-red-500 transition" />
              </div>
            }

          </div>

          <div className="flex flex-col">
            {product.skuValues.map((skuvalue, i) => (
              <div className="flex" key={i}>
                <p className="text-gray-600 text-sm">
                  {skuvalue.productOption.name}:
                </p>
                <p className="text-black text-sm mx-2">
                  {skuvalue.productOptionValue.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex justify-end">
            {product.discountPercent !== 0 ? (
              <span className="text-gray-400 line-through">
                {product.price + "€ "}
              </span>
            ) : null}
          </div>

          <div className="flex text-xl justify-between">
            <div className="flex">
              {!readonly &&
                <div
                  onClick={() => decreaseAmount(product.id)}
                  className="flex justify-center items-center cursor-pointer px-2 h-full bg-black text-white"
                >
                  <IoMdRemove />
                </div>
              }


              <div className="h-full flex justify-center items-center px-4 bg-white text-gray-700">
                {product.amount}
              </div>

              {!readonly &&

                <div
                  onClick={() => increaseAmount(product.id)}
                  className="h-full flex justify-center items-center cursor-pointer px-2 bg-black text-white"
                >
                  <IoMdAdd />
                </div>
              }
            </div>
            <span>
              {(product.price * (100 - product.discountPercent)) / 100 + "€"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
