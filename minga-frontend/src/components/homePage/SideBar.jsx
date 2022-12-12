import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

function SideBar({ item }) {
  const { id, image, category, title, price, amount } = item;
  const { deleteItem, increaseAmount, decreaseAmount } = useContext(CartContext);


  return (
    <div>
      <img className="max-w-[80px]" src={image} alt="" />
    </div>
  );
}

export default SideBar;
