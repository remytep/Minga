import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

// icons
import { BsBag } from 'react-icons/bs';

// shoppingBag contexts
import { ShoppingBagContext } from '../../contexts/ShoppingBagContext'

function Header() {
  const { isOpen, setIsOpen } = useContext(ShoppingBagContext);
  return (
    <header className='sticky top-0 z-20 bg-[#C9C5BA] py-5'>
      <div className='container mx-auto flex justify-between '>
        <div className='flex justify-between w-40'>
          <a href="/">Minga</a>
          <div onClick={() => setIsOpen(!isOpen)}>Filter</div>
        </div>
        
        <div className='container flex justify-around w-56'>
          <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer flex relative'>
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