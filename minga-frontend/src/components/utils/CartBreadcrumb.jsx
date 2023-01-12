import React from "react";
import { useLocation } from "react-router-dom";

function CartBreadcrumb() {

    const location = useLocation();
    //console.log(location.pathname)
    const background = {
        active: "bg-[#C9C5BA]",
        default: "bg-[#dbdbdb]"
    }

    const steps = [
        { name: "Cart", url: "/cart" },
        { name: "Shipping", url: "/order/shipping" },
        { name: "Payment", url: "/order/payment" }

    ]

    return (
        <div className="p-2 flex justify-center items-center w-full mx-auto md:px-14 lg:px-24">
            <div className="flex justify-center space-x-32 w-full">
                {steps.map((step, i) => (
                    <div className="flex flex-col text-gray-600 justify-center items-center" key={i}>
                        <h6 className={`${location.pathname === step.url && "font-semibold"}`}>{step.name}</h6>
                        <div className={`${location.pathname === step.url ? background.active : background.default} w-5 h-5 rounded-full text-xl text-gray-200 flex justify-center items-center`}>
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
export default CartBreadcrumb;