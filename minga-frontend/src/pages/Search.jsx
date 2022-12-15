import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';

import { ProductContext } from "../contexts/ProductContext";
import { SearchContext } from "../contexts/SearchContext";
import Product from "../components/homePage/Product";
import Hero from "../components/homePage/Hero";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../components/homePage/Header";


function Search() {
    const [search, setSearch] = useState('');

    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
    };
    
    useEffect(() => {
        const getResults = async () => {
            const response = await axios({
                method: 'GET',
                url: `http://localhost:8000/api/products?name=${search}`,
                headers: { "content-type": "application/json" },
            });
            console.log(response.data);
            setSearchResults(Object.values(response.data["hydra:member"]));
        };
        getResults();
    }, [])
    return (
        <section>
            <Header />
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
                    <div className='w-full flex flex-col'>
                        {searchResults.filter((product) => {
                            return search.toLowerCase === ""
                            ? product
                            : product.name.toLowerCase().includes(search.toLowerCase());
                        }).map((product) => {
                            return (
                                <div className='w-full min-h-[150px] flex items-center gap-x-4 font-light text-gray-500 border-b border-gray-200'>
                                    <div className="flex justify-between w-full">
                                        <div className="flex flex-col">
                                            <Link to={`/products/${product.id}`}>
                                                <img className='max-w-[80px]' src={product.thumbnail} alt="" />
                                            </Link>
                                            <Link to={`/products/${product.id}`}>
                                                <div>{product.name}</div>
                                            </Link>
                                        </div>
                                        <div className="items-end">{product.price} €</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                 </div>
            </div>
        </section>
    );
}

export default Search;
