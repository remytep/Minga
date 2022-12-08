import React, { useState, useEffect, createContext } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";

function Dropdown() {
  const [categories, setCategories] = useState([]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

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
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm text-black focus:outline-none">
            Categories
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              
                <ul>
                {categories.map((categorie) => ({ active }) => (
                  <li
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {categorie.name}
                  </li>
                ))}
                </ul>

            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default Dropdown;
