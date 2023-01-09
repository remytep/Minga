import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, AddressElement, LinkAuthenticationElement, PaymentElement, } from '@stripe/react-stripe-js';
import axios from 'axios';
import { CartContext } from '../contexts/CartContext';
import CartItem from '../components/Layout/Header/cart/CartItem';
import CartBreadcrumb from '../components/utils/CartBreadcrumb';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { AuthContext } from '../contexts/AuthContext';
import Autocomplete from "react-google-autocomplete";
import PhoneInput from 'react-phone-number-input'
import "./shipping.css";

const Shipping = (props) => {
    const { cart, total, itemAmount } = useContext(CartContext);
    const [customerInfos, setCustomerInfos] = useState({});
    const { user, loaded, logout } = useContext(AuthContext);
    const [country, setCountry] = useState(window.navigator.language.split("-")[1]);

    const handleClick = () => {
        let cart = localStorage.getItem("Mon panier");
        axios.post(`${process.env.REACT_APP_ENTRYPOINT}/pay`, { id: user && user.id, customerInfos, cart })
            .then((res) => {
                window.open(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <>
            <CartBreadcrumb />
            <Link reloadDocument to={'/cart'} className="w-fit text-md font-bold flex py-2 md:ml-[100px]">
                <FiChevronLeft className="mt-1" />Go back
            </Link>

            <div className="flex flex-col md:flex-row">
                <div className="w-10/12 self-center md:self-start md:w-full ml-0 md:ml-[100px]">
                    <h3 className="text-md font-bold py-[10px] mb-5">Shipping informations</h3>

                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-gray-900">Full name</label>
                        <input
                            id="name"
                            className="border text-gray-900 indent-1.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Full name"
                            value={customerInfos.name}
                            onInput={(e) => {
                                setCustomerInfos({ ...customerInfos, name: e.target.value })
                            }}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-gray-900">Email</label>
                        <input
                            id="email"
                            className="border text-gray-900 indent-1.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Email"
                            value={customerInfos.email}
                            onInput={(e) => {
                                setCustomerInfos({ ...customerInfos, email: e.target.value })
                            }}
                        />
                    </div>

                    <label htmlFor="country">Country</label>
                    <Autocomplete
                        id="country"
                        placeholder="Country"
                        className="w-full border rounded mt-2 mb-5 p-2 indent-1.5"
                        apiKey={process.env.REACT_APP_MAPS_API}
                        onPlaceSelected={(place) => {
                            setCountry(place.address_components[0].short_name);
                        }}
                        options={{
                            types: ["country"],
                        }}
                    />

                    <label htmlFor="address">Address</label>
                    <Autocomplete
                        id="address"
                        placeholder="Address"
                        className="w-full border rounded mt-2 mb-5 p-2 indent-1.5"
                        apiKey={process.env.REACT_APP_MAPS_API}
                        onPlaceSelected={(place) => {
                            let obj = {};
                            place.address_components.map((info, key) => {
                                obj[info.types[0]] = info.long_name;
                            })
                            setCustomerInfos({ ...customerInfos, address: obj })
                        }}
                        options={{
                            types: ["address"],
                            fields: ["ALL"],
                            componentRestrictions: { country },
                        }}
                    />

                    <div className="mb-6">
                        <label htmlFor="phone" className="block mb-2 text-gray-900">Phone</label>
                        <PhoneInput
                            id="phone"
                            placeholder="Enter phone number"
                            value={customerInfos.phone}
                            onChange={value => {
                                setCustomerInfos({ ...customerInfos, phone: value })
                            }}
                        />
                    </div>

                </div>
                {itemAmount > 0 && (
                    <div className="flex flex-col justify-center items-center gap-3">
                        <h3 className="text-md font-bold py-[10px]">My cart ({itemAmount})</h3>

                        {cart.map((product, i) => {
                            return (
                                <div className='lg:w-6/12' key={i}>
                                    <CartItem product={product} readonly={true} key={product.id} />
                                </div>
                            );
                        })}
                        <div className="w-6/12 rounded-md border-2 border-[#e8e8e8] p-4 bg-[#f6f6f6] mb-5">
                            <div className="flex justify-between">
                                <h2 className="font-bold text-sm">TOTAL ({itemAmount})</h2>
                                <h2 className="font-bold">{total} €</h2>
                            </div>
                            <h3 className="py-2">Excluding shopping fees</h3>
                        </div>

                        {(customerInfos) &&
                            <div className="w-6/12 my-5 flex-col text-white text-center bg-[#060606] rounded-md">
                                <button
                                    className="font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => handleClick(customerInfos)}
                                >
                                    Confirm address
                                </button>
                            </div>
                        }

                    </div>
                )}
            </div>
        </>
    )
}
export default Shipping;