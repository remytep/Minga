import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdClose, IoMdRemove, IoMdAdd } from "react-icons/io";

import { CartContext } from "../../../../contexts/CartContext";

function CartItem({ product }) {
  console.log(product);
  const { deleteItem, increaseAmount, decreaseAmount } =
    useContext(CartContext);

  return (
    <div className="flex justify-between items-center py-1">
      <div className="flex flex-col">
        <Link
          to={`/products/${product.slug}`}
          className="uppercase text-xl max-w-[240px] text-primary hover:underline"
        >
          {product.product.name}
        </Link>
        {product.skuValues.map((skuvalue, i) => (
          <div className="flex" key={i}>
            <p className="text-gray-500 text-sm">
              {skuvalue.product_option.name}:
            </p>
            <p className="text-black text-sm mx-2">
              {skuvalue.product_option_value.value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex-1 flex items-center justify-around">
        {`${product.price} €`}
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
          <div
            onClick={() => decreaseAmount(product.id)}
            className="flex-1 flex justify-center items-center cursor-pointer h-full"
          >
            <IoMdRemove />
          </div>

          <div className="h-full flex justify-center items-center px-2">
            {product.amount}
          </div>

          <div
            onClick={() => increaseAmount(product.id)}
            className="flex-1 h-full flex justify-center items-center cursor-pointer"
          >
            <IoMdAdd />
          </div>
        </div>
        <div
          onClick={() => deleteItem(product.id)}
          className="text-xl cursor-pointer ml-1"
        >
          <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
