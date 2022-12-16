import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

// icons
import { BsBag } from "react-icons/bs";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

import { AuthContext } from "../../../contexts/AuthContext";
import { ShoppingBagContext } from "../../../contexts/ShoppingBagContext";
import { CartContext } from "../../../contexts/CartContext";
import DynamicSearchBar from "./searchBar/DynamicSearchBar";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const { isOpenBag, setIsOpenBag } = useContext(ShoppingBagContext);
  const { itemAmount } = useContext(CartContext);

  return (
    <header className="sticky top-0 z-20 bg-[#C9C5BA] py-5 flex">
      <div className="container mx-auto flex justify-between items-center">
        <div className="">
          <a href="/">Minga</a>
        </div>
        <DynamicSearchBar />
        <div className="container flex justify-around w-56">
          <div
            onClick={() => setIsOpenBag(!isOpenBag)}
            className="cursor-pointer flex relative"
          >
            <BsBag className="text-3xl" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
          {user ? (
            <>
              {user.roles.includes("ROLE_ADMIN") ? (
                <div>
                  <Link to={"/admin"}>Admin Panel</Link>
                </div>
              ) : null}
              <div>
                <Link onClick={() => logout()}>Logout</Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link to={"/login"}>Connexion</Link>
              </div>
              <div>
                <Link to={"/register"}>Inscription</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
