import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

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
    <main className="flex flex-col px-5 md:px-6 lg:px-10 xl:px-16">
      {subCategories.map((subcategory) => (
        <Link key={subcategory.name} to={`/${category}/${subcategory.name}`}>
          {subcategory.name
            .replace("-", " ")
            .split(" ")
            .map(
              (element) =>
                element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
            )
            .join(" ")}
        </Link>
      ))}
    </main>
  );
}

export default Category;
