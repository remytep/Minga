import { Fragment, useContext } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CartContext } from "../../../../contexts/CartContext";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

export default function CartDropdown() {
  const { cart, total, itemAmount } = useContext(CartContext);
  return (
    <>
      <Link to="/cart" className="block relative sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
        </svg>
        <div className="bg-red-500 absolute -right-2 -top-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
          {itemAmount}
        </div>
      </Link>
      <Popover className="relative hidden sm:block ">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
            ${open ? "" : "text-opacity-90"}
                  group flex items-center rounded-md text-base font-medium`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
              <div className="bg-red-500 absolute -right-2 -top-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                {itemAmount}
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-[32rem] right-0">
                <div className="bg-white border-gray-200 flex flex-col border-2 px-6 max-h-half overflow-y-scroll">
                  {itemAmount > 0 ? (
                    <>
                      <div className="flex justify-between my-3">
                        <h2 className="text-xl">
                          Shopping Cart ({itemAmount})
                        </h2>
                      </div>
                      <div className="flex flex-col gap-3">
                        {cart.map((product) => {
                          return (
                            <CartItem product={product} key={product.id} />
                          );
                        })}
                      </div>
                      <div className="sticky bottom-0 bg-white py-3">
                        <h2 className="text-right text-xl pb-3">
                          Total : {parseFloat(total).toFixed(2)} €
                        </h2>
                        <div className="flex justify-between gap-3">
                          <Popover.Button
                            to="/cart"
                            className="flex-1 text-center py-3 bg-[#C9C5BA] text-black"
                          >
                            Continue shopping
                          </Popover.Button>
                          <Link
                            reloadDocument
                            to="/cart"
                            className="flex-1 text-center py-3 bg-black text-white"
                          >
                            Proceed to checkout
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-center items-center text-gray-400 h-32 text-2xl">
                      Cart is empty
                    </div>
                  )}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
}
