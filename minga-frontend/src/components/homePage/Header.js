import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

// icons
import { BsBag } from 'react-icons/bs';
import { IoIosOptions } from "react-icons/io";
// shoppingBag contexts
import { ShoppingBagContext } from '../../contexts/ShoppingBagContext'

function Header() {
  const { isOpenBag, setIsOpenBag } = useContext(ShoppingBagContext);
  const { isOpenFilter, setIsOpenFilter } = useContext(ShoppingBagContext);

  
  return (
    <header className='sticky top-0 z-20 bg-[#C9C5BA] py-5'>
      <div className='container mx-auto flex justify-between '>
        <div className='flex justify-between w-40'>
          <div>Minga</div>
          <div onClick={() => setIsOpenFilter(!isOpenFilter)} className='cursor-pointer flex relative'>
            <IoIosOptions className='text-2xl' />
          </div>
        </div>
        
        <div className='container flex justify-around w-56'>
          <div onClick={() => setIsOpenBag(!isOpenBag)} className='cursor-pointer flex relative'>
            <BsBag className='text-2xl' />
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