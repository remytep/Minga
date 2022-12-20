import React, { useContext } from "react";
import { FiTrash2, FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import CartItem from "../components/Layout/Header/cart/CartItem";
import { CartContext } from "../contexts/CartContext";

function MonPanier() {
    const { cart, clearCart, total, itemAmount } = useContext(CartContext);

    return ( 

      <div className="h-full py-2 w-full overflow-hidden">
        <div classname="p-2 flex justify-center items-center w-full mx-auto md:px-14 lg:px-24">
          <div className="flex justify-evenly w-full">
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

              <div className="flex flex-col text-gray-600 justify-center items-center">
                <h6>Livraison</h6>
                <div className="w-5 h-5 rounded-full bg-[#dbdbdb] text-xl text-gray-200 flex justify-center items-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center items-center mx-auto px-8 md:px-14 lg:px-24 w-full">
          <div className="flex flex-wrap md:flex-nowrap">
            
            <div class="flex flex-wrap justify-center md:justify-start w-full md:w-xl lg:w-[50vw]">
              <Link to={'/'} className="text-md font-bold flex w-52 py-2"><FiChevronLeft className="mt-1"/>Continuer mes achats</Link>
              <div className="border-2 border-[#e8e8e8] rounded md:mr-8 lg:mr-8 justify-center h-[60vh] mt-0 p-2 overflow-y-auto scrollbar-hide">
                   {cart.map((item) => {
                        return <CartItem item={item} key={item.id} />
                    })}

                vkj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb

                vkj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb

                vkj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
                kj knhnyhhyonhoyhni(nnh(h(-h (-h(khkhk knh't ))))) kjnenvknrtt n grnj jbv rb j bgjtbbbgjtbbbgjtbb
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
          
          
           {/* <div className="py-10 ">
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
              <div className="flex justify-between p-5 border-b-2 border-[#dbdbdb]">
                <h1 className="font-bold">TOTAL ({itemAmount})</h1>
                {total} €
              </div>
              <div className="m-5 flex-col bg-[#060606] rounded-md">
                <div className=' items-center text-white p-3 text-center'>
                  <h2>Valider mon panier</h2>
                </div>
              </div>
            </div>
          </div> */}
      </div>
    );
}

export default MonPanier;
