import React, { useContext } from 'react'
import { IoMdClose } from 'react-icons/io'
import { FiTrash2 } from 'react-icons/fi'

// components
import CartItem from './CartItem'

// ShoppingBag contexts
import { ShoppingBagContext } from '../../contexts/ShoppingBagContext'

// import cart contexts
import { CartContext } from '../../contexts/CartContext'

function ShoppingBag() {
    const { isOpenBag, handleClose } = useContext(ShoppingBagContext);

    const { cart, clearCart, total, itemAmount } = useContext(CartContext);

    return (
        <div className={`${isOpenBag ? 'right-0' : '-right-full'} w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}>
            <div className='flex justify-between items-center py-6 border-b'>
                <div className='uppercase text-sm font-semibold text-gray-700'>Mon panier <span className='text-red-500'>{itemAmount}</span></div>
                <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>
              {itemAmount}
            </div>
                <div onClick={handleClose} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
                    <IoMdClose className='text-2xl text-gray-500' />
                </div>
            </div>
            <div className='flex flex-col gap-y-1 h-[500px] lg:h-[620px] overflow-y-auto overflow-x-hidden border-b pr-5'>
                {cart.map((item) => {
                    return <CartItem item={item} key={item.id} />
                })}
            </div>
            <div className="w-full flex-col bg-[#060606] rounded-md ">
                <div className='flex w-full justify-between items-center text-white p-3 text-center'>
                    <h2>Total : {parseFloat(total).toFixed(2)} €</h2>
                    <div onClick={clearCart} className='cursor-pointer bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl'>
                        <FiTrash2 />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingBag