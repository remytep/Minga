import React, { useEffect } from "react";

function SubcategoryCard({ subcategory }) {
  return (
    <div className="group relative">
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
        <img
          src={`https://localhost:8000/uploads/${subcategory.thumbnail}`}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h3 className="mt-3 text-lg text-gray-700">
        {subcategory.name
          .replace("-", " ")
          .split(" ")
          .map(
            (element) =>
              element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
          )
          .join(" ")}
      </h3>
    </div>
  );
}

export default SubcategoryCard;
