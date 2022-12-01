import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { IoMdClose } from 'react-icons/io'
import { FiTrash2 } from 'react-icons/fi'

// components
import cartItem from './CartItem'

// ShoppingBag contexts
import { ShoppingBagContext } from '../../contexts/ShoppingBagContext'

// import cart contexts
import { CartContext } from '../../contexts/CartContext'

function ShoppingBag() {
    const { isOpen, handleClose } = useContext(ShoppingBagContext);

    const { cart } = useContext(CartContext);
    return (
        <div className={`${isOpen ? 'right-0' : '-right-full'} w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}>
            <div className='flex justify-between items-center py-6 border-b'>
                <div className='uppercase text-sm font-semibold text-gray-700'>Mon panier (0)</div>
                <div onClick={handleClose} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
                    <IoMdClose className='text-2xl text-gray-500' />
                </div>
            </div>
            <div>
                {cart.map((item) => {
                    return <div>{item.title}</div>
                })}
            </div>
        </div>
    )
}

export default ShoppingBag