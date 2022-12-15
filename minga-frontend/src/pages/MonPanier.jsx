import React, { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "../components/homePage/CartItem";
import { CartContext } from "../contexts/CartContext";


function MonPanier() {
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);

  return (
    <div className="h-screen bg-[#C9C5BA]">
      <div className="p-5 h-30 pl-44 bg-white flex items-start">
        <div className="mr-[50px] md:mr-[300px] lg:mr-[300px]">
          <a href="/" className="text-3xl">Minga</a>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col text-gray-600 justify-center items-center">
            <div className="w-9 h-9 rounded-full bg-gray-500 text-xl text-gray-200 flex justify-center items-center">1</div>
            <h6>Panier</h6>
          </div>
          <div className="w-52 md:w-80 lg-w-80 flex flex-col text-gray-600 justify-center items-center">
            <div className="w-9 h-9 rounded-full bg-gray-300 text-xl text-gray-100 flex justify-center items-center">2</div>
            <h6>Livraison et Paiement</h6>
          </div>
        </div>
      </div>

        <div className="py-10 flex justify-center">
          <div className="w-[750px] mr-10 h-[600px] bg-white">
            <div className="h-[550px] bg-white">
              <div className="bg-[#C9C5BA] w-full">
                <h3 className="text-2xl">PANIER ({itemAmount} Produits)</h3>
              </div>
              <div className='mt-3 flex flex-col gap-y-1 h-[520px] overflow-y-auto overflow-x-hidden pr-5'>
                  {cart.map((item) => {
                      return <CartItem item={item} key={item.id} />
                  })}
              </div>
            </div>
            <div className="w-full flex-col bg-[#060606] rounded-md mt-5 ">
                <div className='flex w-full justify-between items-center text-white p-2 text-center'>
                    <h2>Total : {parseFloat(total).toFixed(2)} €</h2>
                    <div onClick={clearCart} className='cursor-pointer bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl'>
                        <FiTrash2 />
                    </div>
                </div>
            </div>
          </div>
          <div className="w-[400px] h-[320px] bg-white">
            <div className="bg-[#C9C5BA] w-full">
              <h3 className="text-2xl">RÉCAPILATULATIF</h3>
            </div>
            <div className="bg-white border-b-[15px] border-[#C9C5BA] w-full p-5">
              <h3 className="mb-4">Un code promo?</h3>
              <form action="" className="flex ">
                <div>
                  <input type="text" className="pl-3 border border-gray-400 rounded mr-5"/>
                </div>
                <button className="pl-5 pr-5 border border-gray-400 rounded">valide</button>
              </form>
            </div>
            <div className="flex justify-between p-5 border-b-2 border-gray-300">
              <h1 className="font-bold">TOTAL ({itemAmount})</h1>
              {total} €
            </div>
            <div className="m-5 flex-col bg-[#060606] rounded-md">
              <div className=' items-center text-white p-3 text-center'>
                <h2>Valider mon panier</h2>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default MonPanier;
