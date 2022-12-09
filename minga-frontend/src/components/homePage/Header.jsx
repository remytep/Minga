import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';

// icons
import { BsBag } from 'react-icons/bs';
import { IoOptionsOutline } from 'react-icons/io5'
import { FiSearch } from 'react-icons/fi'

// shoppingBag contexts
import { ShoppingBagContext } from '../../contexts/ShoppingBagContext'
// filter contexts
import { FilterContext } from '../../contexts/FilterContext';
// cart contexts
import { CartContext } from '../../contexts/CartContext';
import { SearchContext } from '../../contexts/SearchContext';

function Header() {
  const { isOpenBag, setIsOpenBag } = useContext(ShoppingBagContext);
  // const { isOpenSearch, setIsOpenSearch } = useContext(SearchContext);
// 
  const { isOpenFilter, setIsOpenFilter } = useContext(FilterContext);
  const { itemAmount } = useContext(CartContext);

  return (
    <header className='sticky top-0 z-20 bg-[#C9C5BA] py-5'>
      <div className='container mx-auto flex justify-between '>
        <div className='flex justify-between w-40'>
          <a href="/">Minga</a>
          <div onClick={() => setIsOpenFilter(!isOpenFilter)} className='cursor-pointer flex relative'>
            <IoOptionsOutline className='text-3xl' />
          </div>
          <div className='cursor-pointer flex relative'>
            <Link to={'/search'}><FiSearch className='text-3xl' /></Link>
          </div>
        </div>
        <div className='container flex justify-around w-56'>
          <div onClick={() => setIsOpenBag(!isOpenBag)} className='cursor-pointer flex relative'>
            <BsBag className='text-3xl' />
            <div className='bg-red-500 absolute -right-2 bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>
              {itemAmount}
            </div>
          </div>
          <div>
            <Link to={'/login'}>Connexion</Link>
          </div>
          <div>
            <Link to={'/register'}>Inscription</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header