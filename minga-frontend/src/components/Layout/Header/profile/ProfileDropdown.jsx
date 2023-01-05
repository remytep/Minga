import { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { AuthContext } from "../../../../contexts/AuthContext";

export default function ProfileDropdown() {
  const { user, logout } = useContext(AuthContext);
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <Menu.Button className="flex w-full justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
          />
        </svg>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y bg-[#C9C5BA] divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {user ? (
            <div className="py-1">
              <Menu.Item>
                <a
                  href="/profil"
                  className="text-gray-900 block px-4 py-2 text-sm"
                >
                  My Profile
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  href="/profie"
                  className="text-gray-900 block px-4 py-2 text-sm"
                >
                  My Purchase
                </a>
              </Menu.Item>
              {user.roles.includes("ROLE_ADMIN") ? (
                <Menu.Item>
                  <a
                    href="/admin"
                    className="text-gray-900 block px-4 py-2 text-sm"
                  >
                    Admin Panel
                  </a>
                </Menu.Item>
              ) : null}
              <Menu.Item>
                <a
                  href="/"
                  onClick={() => logout()}
                  className={"text-gray-900 block px-4 py-2 text-sm"}
                >
                  Logout
                </a>
              </Menu.Item>
            </div>
          ) : (
            <div className="py-1">
              <Menu.Item>
                <a
                  href="/login"
                  className="text-gray-900 block px-4 py-2 text-sm"
                >
                  Log In
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  href="/register"
                  className="text-gray-900 block px-4 py-2 text-sm"
                >
                  Register
                </a>
              </Menu.Item>
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
