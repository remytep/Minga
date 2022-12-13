import React from "react";
import desk_model1 from "../../assets/homePages/auth/desk_example1.jpg";


function DetailedProduct() {
  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <img src={desk_model1} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col px-8 py-10 justify-between items-center">
        <div className="w-full flex flex-col max-w-[500px]">
          <h1 className="text-2xl text-[#060606] font-Inder mb-8">
            Desk Model
          </h1>

          
          <div className="w-full flex flex-row items-center justify-start relative mb-12">
            <h3 className="text-md absolute text-black/80 bg-[#f5f5f5] pr-2">
              Customize your desk
            </h3>
            <div className="w-full h-[1px] bg-black/40"></div>
          </div>

          <div className="w-full flex flex-col">
            <h4 className="font-Inder text-2xl pb-2">Colors</h4>
            <div className="flex flex-row ">
              <div className="rounded-full border bg-white w-10 h-10 m-4"></div>
              <div className="rounded-full border bg-black w-10 h-10 m-4"></div>
              <div className="rounded-full border bg-gray-400 w-10 h-10 m-4 mb-8"></div>
            </div>

            <h4 className="font-Inder text-2xl pb-2">Size</h4>
            <div className="flex flex-row items-center">
              {/* replace with radio */}
              <div className="bg-gray-200 w-28 h-14 rounded-lg p-3 m-4">
                <p className="font-Inder">140x80</p>
              </div>
              <div className="bg-gray-200 w-28 h-14 rounded-lg p-3 m-4">
                <p className="font-Inder">160x80</p>
              </div>
              <div className="bg-gray-200 w-28 h-14 rounded-lg p-3 m-4">
                <p className="font-Inder">180x80</p>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center">
            </div>

            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
            </p>
          </div>
        </div>

        <div className="w-full h-full flex-col mt-28">
            <button
              type="submit"
              className="w-full text-white bg-[#060606] rounded-md p-3 text-center flex items-center justify-center cursor-pointer"
            >
              Total : 557 €
            </button>
          </div>
        
      </div>
    </div>
  );
}

export default DetailedProduct;
