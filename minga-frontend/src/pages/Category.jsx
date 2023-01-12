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
      url: "http://localhost:8000/api/product_categories/" + category,
      headers: { "content-type": "application/json" },
    }).then((response) => {
      //console.log(response.data);
      setSubCategories(response.data.productSubCategories);
    });
  }, [category]);
  return (
    <main className="px-5 md:px-6 lg:px-10 xl:px-16">
      <div className="flex items-baseline justify-between border-b border-gray-200 py-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {category
            .replace("-", " ")
            .split(" ")
            .map(
              (element) =>
                element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
            )
            .join(" ")}
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 pb-24">
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
