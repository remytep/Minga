import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import SubcategoryCard from "../components/CategoryPage/SubcategoryCard";

function Category() {
  let { category } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://localhost:8000/api/product_categories/" + category,
      headers: { "content-type": "application/json" },
    }).then((response) => {
      console.log(response.data);
      setSubCategories(response.data.productSubCategories);
    });
  }, [category]);
  return (
    <main className="px-5 md:px-6 lg:px-10 xl:px-16">
      <h2 className="text-2xl font-bold text-gray-900">
        {category
          .replace("-", " ")
          .split(" ")
          .map(
            (element) =>
              element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
          )
          .join(" ")}
      </h2>
      <div className="flex mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
        {subCategories.map((subcategory) => (
          <Link key={subcategory.name} to={`/${category}/${subcategory.name}`}>
            <SubcategoryCard subcategory={subcategory} />
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Category;
