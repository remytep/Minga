import React from "react";
import { HiShoppingCart } from "react-icons/hi2";

function ProfileMesCommandes() {
  return (
    <div className=" flex flex-col justify-center md:justify-start w-full md:w-xl lg:w-[50vw] p-5">
      <div className="flex w-full text-center bg-white font-bold uppercase text-sm p-8 h-28">
        <HiShoppingCart className="text-5xl mr-5 md:text-6xl lg:text-6xl" />
        <h4 className="text-3xl mt-1 md:text-4xl lg:5xl">Mes commande</h4>
      </div>

      <p className="text-sm p-5">n(total) commandes passées</p>

      <div className="w-full h-[60vh] overflow-y-auto scrollbar-hide">
        <div className="w-full h-[20vh] flex flex-col bg-white text-sm p-5 mb-5 space-y-2">
            <div className="w-full flex justify-between px-3">
              <p>Order n° :</p>
              <p>Total : 000.00€</p>
            </div>

            <div className="w-full flex flex-col ite border-t-2 border-gray-400">
              <p>Order n° :</p>
              <p>Total : 000.00€</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileMesCommandes;
