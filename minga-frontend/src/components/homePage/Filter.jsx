import React, { useContext } from 'react'
import { IoMdClose } from 'react-icons/io'
import { HiArrowLongRight } from 'react-icons/hi2'

// components

// Filter contexts
import { FilterContext } from '../../contexts/FilterContext'
import { ShoppingBagContext } from '../../contexts/ShoppingBagContext'



function Filter() {
    const { isOpenFilter, handleClose } = useContext(FilterContext);
    const { isOpenBag, setIsOpenBag } = useContext(ShoppingBagContext);


    return (
        <div className={`${isOpenFilter ? 'right-0' : '-right-full'} w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}>
            <div className='flex justify-between items-center py-6 border-b'>
                <div className='uppercase text-sm font-semibold text-gray-700'>Mes options</div>
                <div onClick={handleClose} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
                    <IoMdClose className='text-2xl text-gray-500' />
                </div>
            </div>
            <div className='flex flex-col my-6 '>
                <div  onClick={() => setIsOpenBag(!isOpenBag)}  className='flex justify-between items-center py-6 cursor-pointer  text-gray-700 hover:text-red-400'>
                    <h4 className='text-sm font-semibold '>Taille</h4>
                    <HiArrowLongRight className='text-2xl'/>
                </div>
                <div className='flex justify-between items-center py-6 cursor-pointer  text-gray-700 hover:text-red-400'>
                    <h4 className='text-sm font-semibold '>Couleur</h4>
                    <HiArrowLongRight className='text-2xl'/>
                </div>
                <div className='flex justify-between items-center py-6 cursor-pointer  text-gray-700 hover:text-red-400'>
                    <h4 className='text-sm font-semibold '>Test 3</h4>
                    <HiArrowLongRight className='text-2xl'/>
                </div>
                <div className='flex justify-between items-center py-6 cursor-pointer  text-gray-700 hover:text-red-400'>
                    <h4 className='text-sm font-semibold '>Test 4</h4>
                    <HiArrowLongRight className='text-2xl'/>
                </div>
            </div>
        </div>
    )
}

export default Filter