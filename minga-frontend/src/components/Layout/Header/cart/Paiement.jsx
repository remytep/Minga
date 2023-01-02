import React from "react";

function Paiement() {

    return (
        <div className="h-full py-2 w-full">
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
                <div className="w-5 h-5 rounded-full bg-[#434748] text-xl text-gray-200 flex justify-center items-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
            </div>
            </div>
        </div>

        <div className="mt-16 flex justify-around items-center mx-auto px-8 md:px-14 lg:px-24 w-full">
            
        </div>
        </div>
    );
}

export default Paiement;
