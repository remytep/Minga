import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import axios from "axios";

function NavbarCategories() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };
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
    <nav className="flex items-center justify-between md:pt-4">
      <div className="flex items-center">
        <div className="hidden md:block">
          <ul className="flex space-x-4">
            {categories.map((categorie) => (
              <li key={categorie.id} className="pr-2 font-semibold">
                <Link to={categorie.name}>
                  {categorie.name
                    .split(" ")
                    .map(
                      (element) =>
                        element.charAt(0).toUpperCase() +
                        element.slice(1).toLowerCase()
                    )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex md:hidden">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ ...(isOpen && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={isOpen} anchor="right" variant="persistent">
          <div className="flex justify-end">
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <h1 className="flex justify-center items-center text-2xl font-bold mb-10">
            Categories
          </h1>
          <Box sx={{ width: "100vw" }}>
            <ul>
              <li className="font-semibold flex justify-center items-center text-xl py-4 category">
                <Link to="/" onClick={handleDrawerClose}>
                  Home
                </Link>
              </li>
              {categories.map((categorie) => (
                <li
                  key={categorie.id}
                  className="font-semibold flex justify-center items-center text-xl py-4 category"
                >
                  <Link to={categorie.name} onClick={handleDrawerClose}>
                    {categorie.name
                      .split(" ")
                      .map(
                        (element) =>
                          element.charAt(0).toUpperCase() +
                          element.slice(1).toLowerCase()
                      )}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        </Drawer>
      </div>
    </nav>
  );
}

export default NavbarCategories;
