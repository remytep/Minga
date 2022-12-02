import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

// icons
import { BsBag } from 'react-icons/bs';
import { IoOptionsOutline } from 'react-icons/io5'

// shoppingBag contexts
import { ShoppingBagContext } from '../../contexts/ShoppingBagContext'
import { FilterContext } from '../../contexts/FilterContext';

function Header() {
  const { isOpenBag, setIsOpenBag } = useContext(ShoppingBagContext);
  const { isOpenFilter, setIsOpenFilter } = useContext(FilterContext);
  return (
    <header className='sticky top-0 z-20 bg-[#C9C5BA] py-5'>
      <div className='container mx-auto flex justify-between '>
        <div className='flex justify-between w-40'>
          <a href="/">Minga</a>
          <div onClick={() => setIsOpenFilter(!isOpenFilter)} className='cursor-pointer flex relative'>
            <IoOptionsOutline className='text-3xl'/>
          </div>
        </div>
        
        <div className='container flex justify-around w-56'>
          <div onClick={() => setIsOpenBag(!isOpenBag)} className='cursor-pointer flex relative'>
            <BsBag className='text-3xl' />
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