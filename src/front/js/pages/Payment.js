import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../component/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { AmountSubmit } from "../component/amountSubmitForm";
import { NavBar } from "../component/navbar";
import Image4 from "../../img/image4.jpg";

export const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const routeRequirement = "/api/config";
    const url = `${process.env.BACKEND_URL}${routeRequirement}`;
    fetch(url)
      .then(async (response) => {
        const { publishableKey } = await response.json();
        setStripePromise(loadStripe(publishableKey));
      })
      .catch((error) => {
        console.error("Failed to fetch config:", error);
      });
  }, []);

  useEffect(() => {
    const routeRequirement = "/api/create-payment-intent";
    const url = `${process.env.BACKEND_URL}${routeRequirement}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    })

      .then(async (result) => {
        const { client_secret } = await result.json();
        setClientSecret(client_secret);
      })
      .catch((error) => {
        console.error("Failed to create payment intent:", error);
      });
  }, [amount]);

  return (
    <>
        <div className="home">
          <NavBar />
          <div className="hero">
				    <img className="hero__image" src={Image4} />
              <div className="container donate-box ">
                <h5><strong>JOIN THE CLEANUP!</strong></h5>
                <p>Make a difference today, for a clean ocean and a healthy planet. Your donation will be used to organize new clean-up events on Portugal's beaches, hold awareness-raising sessions and reward our smiling cleaners who show the greatest passion for the activity.
                </p>
                <p>
                With our activity, we will contribute to an active role in cleaning up our oceans, protecting marine life and combating the climate crisis.</p>
                <AmountSubmit setParentAmount={setAmount} /> {}
                {clientSecret && stripePromise && (
                  <Elements stripe={stripePromise} options={{ clientSecret }} >
                    <CheckoutForm />
                  </Elements>
                )}
                <p>This is a secure system, your data will never be used in ways that you haven’t explicitly opted in to.</p>
            </div>
          </div>        
        </div> 
    </>
 );
};




