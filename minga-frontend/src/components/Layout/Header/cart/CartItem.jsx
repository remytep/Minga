import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdClose, IoMdRemove, IoMdAdd } from "react-icons/io";
import { CartContext } from "../../../../contexts/CartContext";

function CartItem({ product }) {
  const { deleteItem, increaseAmount, decreaseAmount } =
    useContext(CartContext);
  console.log(product);
  return (
    <div className="flex bg-[#C9C5BA] h-36">
      <img
        src={`http://localhost:8000/uploads/${product.thumbnail}`}
        alt="desk"
        className="object-contain h-full"
      />
      <div className="flex-1 flex flex-col p-3">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <Link to={`/products/${product.slug}`} className="text-lg">
                {product.product.name}
              </Link>
              <span className="text-xs text-gray-500">
                {product.referenceNumber}
              </span>
            </div>
            <div
              onClick={() => deleteItem(product.id)}
              className="text-lg cursor-pointer"
            >
              <IoMdClose className="text-black hover:text-red-500 transition" />
            </div>
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
              <div
                onClick={() => decreaseAmount(product.id)}
                className="flex justify-center items-center cursor-pointer px-2 h-full bg-black text-white"
              >
                <IoMdRemove />
              </div>

              <div className="h-full flex justify-center items-center px-4 bg-white text-gray-700">
                {product.amount}
              </div>

              <div
                onClick={() => increaseAmount(product.id)}
                className="h-full flex justify-center items-center cursor-pointer px-2 bg-black text-white"
              >
                <IoMdAdd />
              </div>
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
