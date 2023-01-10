import React from "react";
import { HiShoppingCart } from "react-icons/hi2";
import { ImCheckboxChecked } from "react-icons/im";
import { GiSandsOfTime } from "react-icons/gi";


function ProfileMesCommandes() {
  return (
    <div className=" flex flex-col justify-center md:justify-start w-full md:w-xl lg:w-[50vw] p-5">
      <div className="flex w-full text-center bg-white font-bold uppercase text-sm p-8 h-28">
        <HiShoppingCart className="text-5xl mr-5 md:text-6xl lg:text-6xl" />
        <h4 className="text-3xl mt-1 md:text-4xl lg:5xl">Mes commande</h4>
      </div>

      <p className="text-sm p-5">n(total) commandes passées</p>

      <div className="w-full h-[60vh] overflow-y-auto scrollbar-hide">
        <div className="w-full flex flex-col bg-white text-sm p-5 mb-5 space-y-2">
          <div className="w-full flex justify-between px-3 font-medium">
            <p>Order n° :</p>
            <p>Total : 000.00€</p>
          </div>

          <div className="w-full flex flex-col items-center border-t-2 border-gray-400">
            <div className="flex flex-row space-x-6 p-3">
              <div className="text-3xl flex items-center pt-2">
                <GiSandsOfTime/>
              </div>
              <div>
                <p className="text-lg font-bold">En cours de livraison</p>
                <p className="font-medium opacity-70">Commande passée le jj.mm.aa</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col bg-white text-sm p-5 mb-5 space-y-2">
          <div className="w-full flex justify-between px-3 font-medium">
            <p>Order n° :</p>
            <p>Total : 000.00€</p>
          </div>

          <div className="w-full flex flex-col items-center border-t-2 border-gray-400">
            <div className="flex flex-row space-x-6 p-3">
              <div className="text-3xl text-green-600 flex items-center pt-2">
                <ImCheckboxChecked/>
              </div>
              <div>
                <p className="text-lg font-bold">Commande livrée !</p>
                <p className="font-medium opacity-70">Livrée le jj.mm.aa</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col bg-white text-sm p-5 mb-5 space-y-2">
          <div className="w-full flex justify-between px-3 font-medium">
            <p>Order n° :</p>
            <p>Total : 000.00€</p>
          </div>

          <div className="w-full flex flex-col items-center border-t-2 border-gray-400">
            <div className="flex flex-row space-x-6 p-3">
              <div className="text-3xl text-green-600 flex items-center pt-2">
                <ImCheckboxChecked/>
              </div>
              <div>
                <p className="text-lg font-bold">Commande livrée !</p>
                <p className="font-medium opacity-70">Livrée le jj.mm.aa</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfileMesCommandes;
