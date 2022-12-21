import React, { useContext } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoMdClose, IoMdRemove, IoMdAdd } from "react-icons/io";
import { CartContext } from "../../../../contexts/CartContext";
import CartItem from "./CartItem";


function Cart({ product }) {

    const { cart, total, itemAmount } = useContext(CartContext);

    return ( 

      <div className="h-full py-2 w-full overflow-hidden">
        <div className="p-2 flex justify-center items-center w-full mx-auto md:px-14 lg:px-24">
          <div className="flex justify-center space-x-32 w-full">
            <div className="flex flex-col text-gray-600 justify-center items-center">
              <h6>Panier</h6>
              <div className="w-5 h-5 rounded-full bg-[#434748] text-xl text-gray-200 flex justify-center items-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>

            <div className="flex flex-col text-gray-600 justify-center items-center">
              <h6>Paiement</h6>
              <div className="w-5 h-5 rounded-full bg-[#dbdbdb] text-xl text-gray-200 flex justify-center items-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center items-center mx-auto px-8 md:px-14 lg:px-24 w-full">
          <div className="flex flex-wrap md:flex-nowrap">
            
            <div className="flex flex-wrap justify-center md:justify-start w-full md:w-xl lg:w-[50vw]">
              <Link to={'/'} className="text-md font-bold flex w-52 py-2"><FiChevronLeft className="mt-1"/>Continuer mes achats</Link>
              <div className=" md:mr-8 lg:mr-8 justify-center h-[60vh] mt-0 p-2 overflow-y-auto scrollbar-hide">
              {itemAmount > 0 ? (
                    <>
                      <div className="flex flex-col gap-3">
                        {cart.map((product) => {
                          return (
                            <CartItem product={product} key={product.id} />
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-center items-center text-gray-400 h-32 text-2xl">
                      Cart is empty
                    </div>
                  )}
              </div>
            </div>

            <div className="w-full lg:w-[20vw]">
              <h3 className="text-md font-bold py-[10px]">Mon panier ({itemAmount})</h3>
                
              <div className="rounded-md border-2 border-[#e8e8e8] p-4 bg-[#f6f6f6]">
                <div className="flex justify-between">
                  <h2 className="font-bold text-sm">TOTAL ({itemAmount})</h2>
                  <h2 className="font-bold">{total} €</h2>
                </div>
                <h3 className="py-2">Hors frais de livraison</h3>
              </div>
              <div className="mt-5 flex-col bg-[#060606] rounded-md">
                <div className=' items-center text-white p-3 text-center'>
                  <h2>Valider mon panier</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Cart;
