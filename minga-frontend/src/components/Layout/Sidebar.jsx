import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Sidebar() {
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
    <div className="w-72 border border-1 border-gray-400 mr-10 p-3">
      <div className="flex items-center w-full px-3 mt-3 border-b border-gray-400">
        <svg
          className="w-6 h-6 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h1 className="ml-2 text-2xl font-semibold">Catégories</h1>
      </div>
      <ul>
        {categories.map((categorie) => (
          <li
            key={categorie.id}
            className="pl-10 p-2 text-sm font-semibold hover:bg-sky-200"
          >
            <Link to={categorie.name}>{categorie.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
