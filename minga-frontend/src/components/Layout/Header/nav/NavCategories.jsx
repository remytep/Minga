import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function NavCategories() {
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
    <>
      <nav className="hidden md:block">
        <ul className="flex">
          {categories.map((categorie) => (
            <li key={categorie.id} className="pr-2 font-semibold">
              <Link to={categorie.name}>{categorie.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col md:hidden">
        <ul className="flex flex-col">
          {categories.map((categorie) => (
            <li key={categorie.id} className="pr-2 font-semibold">
              <Link to={categorie.name}>{categorie.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default NavCategories;
