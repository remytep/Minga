import React, { useContext } from 'react'

import { ProductContext } from '../contexts/ProductContext'
import Product from '../components/homePage/Product'

import Hero from '../components/homePage/Hero';

function Accueil() {
    const { products } = useContext(ProductContext);

    const filteredProducts = products.filter((item) => {
        return (
            item.category === "electronics");
    });

    return (
        <div>
            <Hero />
            <section className='py-16'>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
                        {filteredProducts.map((product) => {
                            return <Product product={product} key={product.id} />;
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Accueil