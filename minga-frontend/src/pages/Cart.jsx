import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/Stripe/CheckoutForm";
import axios from "axios";
// import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51M98c5KpRc4HZ65yzWoUwcy8Fh3kRVge4MCI6RnU4oP9jFNXcDOAaQBMLj8TCcMXZS9DRtlxZqFFQH4MeTYfAMfz00p0J2oeDV");

function Cart() {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        axios.post(`${process.env.REACT_APP_ENTRYPOINT}/create`,
            JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
            { "Content-Type": "application/json" })
            .then((res) => {
                setClientSecret(JSON.parse(res.data).clientSecret);
            })
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="App">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}
export default Cart;