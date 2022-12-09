// import axios from "axios";
// import React, { useState, useContext, useEffect } from "react";
// import { Link } from 'react-router-dom'

// import { IoMdClose } from 'react-icons/io'

// import Product from "./Product";

// import { ProductContext } from "../../contexts/ProductContext";
// import { SearchContext } from "../../contexts/SearchContext";

// function Search() {
//   const { products } = useContext(ProductContext);
//   const [search, setSearch] = useState('');

//   const { isOpenSearch, handleCloseSearch } = useContext(SearchContext);

//   const handleSearch = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div className={`${isOpenSearch ? 'top-0' : '-top-full'} w-full bg-white fixed top-0 h-full transition-all duration-300 z-20 px-32`}>
      
//       <div className='flex justify-between items-center py-6 border-b'>
//         <form action="">
//           <div className="flex w-[15rem] md:w-[30rem] xl:w-[76rem]">
//             <input
//                 className="placeholder:italic placeholder:text-black text-black outline-none w-full py-2 pl-9 pr-3"
//                 placeholder="Looking for something..."
//                 type="text"
//                 name="search"
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               {/* <button id="searchBtn" className="btn bg-gray-500 text-white text-xl font-vold rounded-r-lg">Search</button> */}
//             </div>
//           </form>
//           <div onClick={handleCloseSearch} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
//               <IoMdClose className='text-2xl text-gray-500' />
//           </div>
//       </div>

//       <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10px] max-w-sm mx-auto md:max-w-none md:mx-0">
//           {products.filter((product) => {
//             return search.toLowerCase === ""
//               ? product
//               : product.name.toLowerCase().includes(search);
//           }).map((product) => {
//             return <Product product={product} key={product.id} />;
//           })}
//       </div>
//     </div>
//   );
// }

// export default Search;
