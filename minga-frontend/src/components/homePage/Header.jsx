import React, { useContext } from "react";
import { Link } from "react-router-dom";

// icons
import { BsBag } from "react-icons/bs";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";

// shoppingBag contexts
import { ShoppingBagContext } from "../../contexts/ShoppingBagContext";

function Header() {
  const { isOpen, setIsOpen } = useContext(ShoppingBagContext);
  return (
    <header className="sticky top-0 z-20 bg-[#C9C5BA] py-5">
      <div className="container mx-auto flex justify-between">
        <div className="flex justify-between w-40">
          <div className="flex flex-row gap-3 justify-center items-center">
            <a href="/" className="text-2xl">
              Minga
            </a>
            <div className="flex cursor-pointer">
              <p className="">Categories</p>
              <ArrowDropDownIcon />
            </div>

            {/* <Link to={'/admin'}>Admin</Link> */}
          </div>
        </div>

        <div className="container gap-3 flex flex-row justify-around items-center w-56">
          <div>
            <Link to={"/login"}>Connexion</Link>
          </div>
          <div>
            <Link to={"/register"}>Inscription</Link>
          </div>
          <div>
            <CgProfile className="text-3xl" />
          </div>
          <div>
            <AiOutlineHeart className="text-3xl" />
          </div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative"
          >
            <BsBag className="text-3xl" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
