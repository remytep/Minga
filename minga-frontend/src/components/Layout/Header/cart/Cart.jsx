import React, { useContext, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoMdClose, IoMdRemove, IoMdAdd } from "react-icons/io";
import { CartContext } from "../../../../contexts/CartContext";
import CartItem from "./CartItem";


function Cart() {

    const { cart, total, itemAmount } = useContext(CartContext);
    const [showModal, setShowModal] = useState(false);

    return ( 

      <div className="h-full py-2 w-full overflow-hidden">
        <div className="p-2 flex justify-center items-center w-full mx-auto md:px-14 lg:px-24">
          <div className="flex justify-center space-x-32 w-full">
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
              <div className="mt-5 flex-col text-white text-center bg-[#060606] rounded-md">
                <button
                  className="font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Valider mon panier
                </button>
              </div>
              
              {showModal ? (
                <>
                  <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-6"
                  >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="items-center text-center p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-2xl font-semibold">Identification</h3>
                        </div>
                        
                        {/*body*/}
                        <div className="m-5 flex flex-wrap md:flex-nowrap px-16">
          
                          <div className="flex flex-col text-center justify-center w-full">
                            <p>Connectez-vous pour payer</p>
                            <div className='my-2 bg-[#060606] items-center text-white p-3 text-center rounded'>
                              <Link to={'/login'}><h2>Connexion</h2></Link>
                            </div>
                          </div>
                          
                          <div className="flex justify-center w-full py-6 md:py-0 lg:py-0">
                            <hr className="w-16 md:w-1 lg:w-1 md:h-44 lg:h-44 border-2 bg-[#e8e8e8]"/>
                          </div>

                          <div className=" flex flex-col text-center justify-center w-full">
                            <p>Payer directement</p>
                            <div className='my-2 bg-[#060606] items-center text-white p-3 text-center rounded'>
                              <Link to={'/paiement'}><h2>Paiement</h2></Link>
                            </div>
                          </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Fermer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Cart;
