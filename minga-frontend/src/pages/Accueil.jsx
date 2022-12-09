import React, { useContext } from 'react'

import Product from '../components/homePage/Product'
import { ProductContext } from '../contexts/ProductContext'

import Hero from '../components/homePage/Hero';
import { useState } from 'react';

function Accueil() {
    const { products } = useContext(ProductContext);

    const [isDeskframe, setIsDeskframe] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isLshape, setIsLshape] = useState(false);

    const filteredDeskframe = products.filter((item) => {
        return (
            item.productCategory === "/api/product_categories/1");
    });

    // const filteredDesktop = products.filter((item) => {
    //     return (
    //         item.category === "jewelery");
    // });

    // const filteredLshape = products.filter((item) => {
    //     return (
    //         item.category === "men's clothing");
    // });
    
    return (
        <section>
            <Hero />
            <div className='py-16 flex '>
                <div className="flex flex-col items-center w-48 h-full mr-5 py-2 overflow-hidden text-gray-700 bg-[#C9C5BA] rounded">
                    <div className='flex items-center w-full px-3 mt-3'>
                        <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h1 className="ml-2 text-2xl font-semibold">Catégories</h1>
                    </div>
                    <div className="w-full px-2">
                        <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
                            <div onClick={() => setIsDeskframe(!isDeskframe)} className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-slate-100 cursor-pointer">
                                <h2 className="ml-2 text-sm font-medium">Deskframe</h2>
                            </div>
                            <div  className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-slate-100 cursor-pointer">
                                <h2 className="ml-2 text-sm font-medium">Desktop</h2>
                            </div>
                            <div  className="flex items-center w-full h-12 px-3 mt-2 hover:bg-slate-100 rounded cursor-pointer">
                                <h2 className="ml-2 text-sm font-medium">L-shape</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container mx-auto'>
                    {isDeskframe ? 
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
                            {filteredDeskframe.map((product) => {
                                return <Product product={product} key={product.id} />;
                            })}
                        </div>

                        :
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
                            {products.map((product) => {
                                return <Product product={product} key={product.id} />;
                            })}
                        </div>
                    }

                </div>
            </div>
        </section>
    )
}

export default Accueil