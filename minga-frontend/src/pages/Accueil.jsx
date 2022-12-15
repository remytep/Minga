import React, { useContext, useEffect } from 'react'

import Hero from '../components/homePage/Hero';
import Product from '../components/homePage/Product'
import Slider from "../components/homePage/slider/Slider";

import { ProductContext } from '../contexts/ProductContext'

import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/homePage/Header';

function Accueil() {
    const { products } = useContext(ProductContext);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:8000/api/product_categories")
        .then((res) => {
            console.log(res.data["hydra:member"]);
            setCategories(Object.values(res.data["hydra:member"]));
        })
        .catch((error) => {
            console.log(error);
        });
        return;
    }, []);
    
    return (
        <section className='h-screen'>
            <Header />
            {/* <Hero /> */}
            <div>
                <Slider className="absolute" />
                <div className='absolute top-44 ml-20 flex flex-col justify-center'>
                    {/* pretitle */}
                    <div className='font-semibold flex items-center uppercase'>
                        <div className='w-10 h-[2px] bg-red-500 mr-3'></div>
                        Breaking News
                    </div>
                    {/* title */}
                    <h1 className='text-[70px] leading-[1.1] font-light mb-4'>
                        WE HAVE THE BEST<br />
                        <span className='font-semibold'>STANDING DESK</span>
                    </h1>
                    <Link to={'/'} className='self-start uppercase font-semibold border-b-2 border-red-500'>
                        Start shopping
                    </Link>
                    </div>
                </div>
            <div className='flex '>
                <div className='w-72 border border-1 border-gray-400 mr-10 p-3'>
                    <div className='flex items-center w-full px-3 mt-3 border-b border-gray-400'>
                        <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h1 className="ml-2 text-2xl font-semibold">Catégories</h1>
                    </div>
                    <ul>
                        {
                            categories.map((categorie) => (
                            <li key={categorie.id} className="pl-10 p-2 text-sm font-semibold hover:bg-sky-200">{ categorie.name }</li>
                            ))
                        }
                    </ul>
                </div>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
                        {products.map((product) => {
                            return <Product product={product} key={product.id} />;
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Accueil