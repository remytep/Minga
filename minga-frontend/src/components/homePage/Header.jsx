import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { Select, Option } from "@material-tailwind/react";

// icons
import { BsBag } from "react-icons/bs";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { FiSearch } from 'react-icons/fi'

// shoppingBag contexts
import { ShoppingBagContext } from "../../contexts/ShoppingBagContext";
import Dropdown from "./Dropdown";
import { CartContext } from "../../contexts/CartContext";

function Header() {
  const { isOpenBag, setIsOpenBag } = useContext(ShoppingBagContext);
  const { itemAmount } = useContext(CartContext);

  return (
    <header className="sticky top-0 z-20 bg-[#C9C5BA] py-5">
      <div className="container mx-auto flex justify-between">
        <div className="flex justify-between w-40">
          <div className="flex flex-row gap-3 justify-center items-center">
            <a href="/" className="text-2xl">
              Minga
            </a>
            
            {/* <div className="flex w-full items-end gap-4">
              <Select variant="outlined" label="Select Version">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
              <Select variant="standard" label="Select Version">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
              <Select variant="static" label="Select Version">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
            </div> */}

            <div>
              <Link to={"/search"}><FiSearch /></Link>
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
          <div onClick={() => setIsOpenBag(!isOpenBag)} className='cursor-pointer flex relative'>
            <BsBag className='text-3xl' />
            <div className='bg-red-500 absolute -right-2 bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>
              {itemAmount}
            </div>
          </div>
          {/* <div onClick={() => setIsOpenBag(!isOpenBag)} className="cursor-pointer flex relative"
          >
            <BsBag className="text-3xl" />
          </div> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
