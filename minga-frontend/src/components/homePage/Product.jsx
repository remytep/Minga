import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BsPlus, BsEyeFill } from 'react-icons/bs'

// cart context
import { CartContext } from '../../contexts/CartContext'

function Product({ product }) {
  const { addToCart } = useContext(CartContext);

  // product value
  const { id, image, category, title, price } = product;
  return (
    <div>
      <div className='border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transion'>
        {/* product image */}
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-[200px] mx-auto flex justify-center items-center'>
            <img className='max-h-[170px] group-hover:scale-110 transition duration-300' src={image} alt="" />
          </div>
        </div>
        {/* product icon */}
        <div className='absolute top-2 -right-11 group-hover:right-2 p-1 gap-y-1 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <button onClick={() => addToCart(product, id)}>
            <div className='flex justify-center items-center bg-red-500 text-white w-8 h-8'>
              <BsPlus className='text-2xl' />
            </div>
          </button>
          <Link to={`/products/${id}`} className='w-8 h-8 flex justify-center items-center text-primary drop-shadow-xl'>
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div className='text-left'>
        <div className='text-sm capitalize text-grey-500 font-semibold opacity-50 mb-1'>{category}</div>
        <Link to={`/products/${id}`}>
          <h3 className='font-semibold opacity-90 mb-1'>{title}</h3>
        </Link>
        <div className='font-semibold opacity-90'>{price} €</div>
      </div>
    </div>
  )
}

export default Product