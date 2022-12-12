import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";

function Dropdown() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product_categories")
      .then((res) => {
        console.log(res.data["hydra:member"]);
        setCategories(Object.values(res.data["hydra:member"]));
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  }, []);

  return (
    <div className="flex cursor-pointer">
      <div className="w-45 font-medium" onClick={() => setOpen(!open)}>
        <div className="w-full flex items-center justify-between rounded">
          Categories
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </div>
        <ul className={`bg-white mt-2 overflow-y-auto text-black ${open ? 'max-h-50' : 'max-h-0'}`}>
          {
            categories.map((categorie) => (
              <li key={categorie.id} className="p-2 text-sm hover:bg-sky-200">{ categorie.name }</li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
