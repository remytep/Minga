import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Offcanvas } from "react-bootstrap";
import axios from "axios";

import { AuthContext } from "../../../contexts/AuthContext";
import { ShoppingBagContext } from "../../../contexts/ShoppingBagContext";
import { CartContext } from "../../../contexts/CartContext";
import ProfileDropdown from "./profile/ProfileDropdown";
import DynamicSearchBar from "./searchBar/DynamicSearchBar";
import CartDropdown from "./cart/CartDropdown";
import NavCategories from "./nav/NavCategories";

function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:8000/api/product_categories")
      .then((res) => {
        /*        console.log(res.data["hydra:member"]); */
        setCategories(Object.values(res.data["hydra:member"]));
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  }, []);
  return (
    <header className="sticky top-0 z-20 bg-[#C9C5BA] py-5 px-3 flex justify-between md:flex-col">
      <div className="flex-1 flex justify-between">
        <div className="text-2xl flex items-center pr-2">
          <a href="/">Minga</a>
        </div>
        <div className="hidden md:block">
          <DynamicSearchBar />
        </div>
        <div className="pl-2 flex items-center justify-between">
          <ProfileDropdown />
          <CartDropdown />
        </div>
      </div>
      <Navbar expand="md">
        <Navbar.Toggle aria-controls="nav-categories" bsPrefix="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id="nav-categories"
          aria-labelledby="nav-categories"
          placement="end"
        >
          <Offcanvas.Header closeButton>Categories</Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="">
              {categories.map((categorie) => (
                <li key={categorie.id} className="pr-2 font-semibold">
                  <Link to={categorie.name}>{categorie.name}</Link>
                </li>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </header>
  );
}

export default Header;
