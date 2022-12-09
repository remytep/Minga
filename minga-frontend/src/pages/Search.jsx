import React, { useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { SearchContext } from "../contexts/SearchContext";
import Product from "../components/homePage/Product";
import Hero from "../components/homePage/Hero";
import { IoMdClose } from "react-icons/io";


function Search() {
    const { products } = useContext(ProductContext);
    const [search, setSearch] = useState('');


    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <section>
            <div className='flex flex-col items-center'>
                <div className="flex justify-center items-center bg-[#C9C5BA] w-full h-32">
                    <form action="">
                        <div className="w-[15rem] md:w-[30rem] xl:w-[76rem] ">
                            <input
                                className="placeholder:italic placeholder:text-black text-black rounded-md outline-none w-full py-2 pl-9 pr-3"
                                placeholder="Looking for something..."
                                type="text"
                                name="search"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {/* <button id="searchBtn" className="btn bg-gray-500 text-white text-xl font-vold rounded-r-lg">Search</button> */}
                        </div>
                    </form>
                </div>
                <div className='py-10 container mx-auto h-screen'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
                        {products.filter((product) => {
                            return search.toLowerCase === ""
                            ? product
                            : product.name.toLowerCase().includes(search);
                        }).map((product) => {
                            return <Product product={product} key={product.id} />;
                        })}
                    </div>
                 </div>
            </div>
        </section>
    );
}

export default Search;
