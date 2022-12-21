import React, { useContext } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import ProfileDropdown from "./profile/ProfileDropdown";
import DynamicSearchBar from "./searchBar/DynamicSearchBar";
import CartDropdown from "./cart/CartDropdown";
import NavbarCategories from "./navbar/NavbarCategories";
import BreadcrumbsBar from "./breadcrumbs/BreadcrumbsBar";

function Header() {
  let { category, subcategory, slug } = useParams();
  const location = useLocation();
  if (location.pathname.includes("/search/")) {
    category = "search";
  }
  return (
    <>
      <header className="sticky top-0 z-20 bg-[#C9C5BA] py-3 md:py-5 px-5 md:px-6 lg:px-10 xl:px-16 flex justify-between md:flex-col">
        <div className="flex-1 flex justify-between">
          <div className="text-2xl flex items-center pr-4">
            <Link to href="/">
              Minga
            </Link>
          </div>
          <div className="hidden md:block flex-1">
            <DynamicSearchBar />
          </div>
          <div className="pl-4 flex items-center justify-between gap-3 md:gap-4">
            <ProfileDropdown />
            <CartDropdown />
          </div>
        </div>
        <NavbarCategories />
      </header>
      <div className="px-5 md:px-6 lg:px-10 xl:px-16 py-2 md:hidden">
        <DynamicSearchBar />
      </div>
      {category || slug ? (
        <div className="px-5 md:px-6 lg:px-10 xl:px-16 py-2 lg:py-4">
          <BreadcrumbsBar
            category={category}
            subcategory={subcategory}
            slug={slug}
          />
        </div>
      ) : null}
    </>
  );
}

export default Header;
