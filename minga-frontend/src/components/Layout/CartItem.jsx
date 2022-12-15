import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { IoMdClose, IoMdRemove, IoMdAdd } from 'react-icons/io'

import { CartContext } from '../../contexts/CartContext';

function CartItem({ item }) {
    const { id, image, category, title, price, amount } = item;
    const { deleteItem, increaseAmount, decreaseAmount } = useContext(CartContext);

    return (
        <div className='flex gap-x-4 py-2 lg:px-6 w-full'>
            <div className='w-full min-h-[150px] flex items-center gap-x-4 font-light text-gray-500 border-b border-gray-200'>
                <Link to={`/products/${id}`}>
                    <img className='max-w-[80px]' src={image} alt="" />
                </Link>
                <div className='w-full flex flex-col'>
                    <div className='flex justify-between mb-2'>
                        <Link to={`/products/${id}`} className='text-sm uppercase font-medium max-w-[240px] text-primary hover:underline'>
                            {title}
                        </Link>
                        {/* remove item */}
                        <div onClick={() => deleteItem(id)} className='text-xl cursor-pointer'>
                            <IoMdClose className='text-gray-500 hover:text-red-500 transition' />
                        </div>
                    </div>
                    <div className='flex gap-x-2 h-[36px] text-sm'>
                        {/* quantité */}
                        <div className='flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium'>
                            {/* icon moins */}
                            <div
                                onClick={() => decreaseAmount(id)}
                                className='flex-1 flex justify-center items-center cursor-pointer h-full'
                            >
                                <IoMdRemove />
                            </div>
                            {/* total */}
                            <div className='h-full flex justify-center items-center px-2'>
                                {amount}
                            </div>
                            {/* icon plus */}
                            <div onClick={() => increaseAmount(id)} className='flex-1 h-full flex justify-center items-center cursor-pointer'>
                                <IoMdAdd />
                            </div>
                        </div>
                        {/* item price */}
                        <div className='flex-1 flex items-center justify-around'>{price} €</div>
                        {/* final price */}
                        {/* price decimals */}
                        <div className='flex-1 flex justify-end items-center text-primary font-medium'>{`${parseFloat(price * amount).toFixed(2)}`} €</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem