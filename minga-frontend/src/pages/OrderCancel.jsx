import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";

function Cancel() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [customer, setCustomer] = useState();
    const checkoutId = searchParams.get("session_id");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_ENTRYPOINT}/checkout`,
            checkoutId
            ,
            { "Content-Type": "application/json" })
            .then((res) => {
                setCustomer(JSON.parse(res.data));
                setLoaded(true);
            })
            .catch((err) => {
                if (err.response.data.detail.startsWith("No such")) {
                    setCustomer(null);
                }
                setLoaded(true);
            })
    }, [checkoutId])

    if (loaded && (!checkoutId || !customer)) {
        return (
            <Navigate to="/" replace={true} />
        )
    }

    if (loaded)
        return (
            <div>
                <div className="h-screen">
                    <div className="bg-white p-6 md:mx-auto">
                        <svg
                            className="text-red-600 w-16 h-16 mx-auto my-6"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                        >
                            <path fill="currentColor" d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                        </svg>
                        {/* <svg
            viewBox="0 0 24 24"
            className="text-red-600 w-16 h-16 mx-auto my-6"
          > */}
                        {/* <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg> */}
                        <div className="text-center">
                            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                                Cancel Order
                            </h3>
                            <p className="text-gray-600 my-2">Something went wrong</p>
                            <p> Had a trouble ? Please contact us.</p>
                            <div className="py-10 text-center">
                                <Link
                                    replace={true}
                                    reloadDocument
                                    to="/"
                                    className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                                >
                                    GO BACK
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Cancel;
