import React, { useState } from "react";
import { HiShoppingCart } from "react-icons/hi2";
import { ImCheckboxChecked } from "react-icons/im";
import { GiSandsOfTime } from "react-icons/gi";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";

function ProfileMesCommandes() {

    const [orders, setOrders] = useState([]);
    const [trackings, setTrackings] = useState([]);
    const { user, logout } = useContext(AuthContext);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ENTRYPOINT}/orders`)
            .then((res) => {
                let userOrders = res.data["hydra:member"].filter((obj) => {
                    if (user.id === obj.user.id && obj.status !== "CART") {
                        return obj;
                    }
                })
                userOrders.sort((a, b) =>
                    b.id - a.id
                )
                setOrders(userOrders);
            })

    }, [true])
    useEffect(() => {
        orders.map((obj) => {
            axios.get(`${process.env.REACT_APP_ENTRYPOINT}/tracking/${obj.idEasypostTracking}`)
                .then((res) => {
                    setTrackings(trackings => [...trackings, res.data]);
                })
        })
    }, [orders])

    return (
        <div className=" flex flex-col justify-center md:justify-start w-full md:w-xl lg:w-[50vw] p-5">
            <div className="flex w-full text-center bg-white font-bold uppercase text-sm p-8 h-28">
                <HiShoppingCart className="text-5xl mr-5 md:text-6xl lg:text-6xl" />
                <h4 className="text-3xl mt-1 md:text-4xl lg:5xl">My orders</h4>
            </div>


            <p className="text-sm p-5">{orders.length} commandes passées</p>

            <div className="w-full h-[60vh] overflow-y-auto scrollbar-hide">

                {trackings && orders.map((order, i) => (
                    <div key={i} className="w-full flex flex-col bg-white text-sm p-5 mb-5 space-y-2">
                        <div className="w-full flex justify-between px-3 font-medium">
                            <p>Order n° {order.orderNumber}:</p>
                            <p>Total : {order.totalAmount}€</p>
                        </div>

                        <div className="w-full flex flex-col items-center border-t-2 border-gray-400">
                            <div className="flex flex-row space-x-6 p-3">


                                {trackings.find((obj) => obj.id === order.idEasypostTracking) &&
                                    <>
                                        <div className="text-3xl flex items-center pt-2">
                                            {trackings.find((obj) => obj.id === order.idEasypostTracking).status === "delivered" ? (
                                                <div className="text-3xl text-green-600 flex items-center pt-2">
                                                    <ImCheckboxChecked />
                                                </div>
                                            ) : (<GiSandsOfTime />
                                            )}
                                        </div>
                                        <div>

                                            <a href={trackings.find((obj) => obj.id === order.idEasypostTracking).public_url} className="text-xl text-gray-500">{trackings.find((obj) => obj.id === order.idEasypostTracking).tracking_code}</a>
                                            <p className="text-lg font-bold uppercase">
                                                {trackings.find((obj) => obj.id === order.idEasypostTracking).status}
                                            </p>
                                            <p className="font-medium opacity-70">Commande passée le {new Date(trackings.find((obj) => obj.id === order.idEasypostTracking).created_at).toLocaleString()}
                                            </p>
                                        </div>

                                    </>


                                }
                            </div>
                        </div>
                    </div>
                ))

                }

            </div>
        </div>
    );
}

export default ProfileMesCommandes;