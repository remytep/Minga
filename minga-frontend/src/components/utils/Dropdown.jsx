import React, { useState, useContext, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { BsBag } from 'react-icons/bs'
import { FiTrash2 } from 'react-icons/fi';
import { CartContext } from '../../contexts/CartContext';
import CartItem from '../Layout/CartItem';
import { Link } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

function Dropdown() {
    const { cart, clearCart, total, itemAmount } = useContext(CartContext);

    return (
        <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <BsBag className="text-3xl"/>
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
            <div className="flex w-full justify-between items-center p-2 text-center">
                Mon panier <span className="text-red-500">{itemAmount}</span>
            </div>
            <div className="flex flex-col gap-y-1 h-[100px] lg:h-[150px] overflow-y-auto overflow-x-hidden border-b pr-5">
                {cart.map((item) => {
                return <CartItem item={item} key={item.id} />;
                })}
            </div>
            <div className="w-full bg-[#060606] items-center text-white p-1 text-center rounden-b">
                <Link to={"/panier"}>Voir mon panier</Link>
            </div>
        </Menu.Items>
      </Transition>
    </Menu>
    )
}

export default Dropdown