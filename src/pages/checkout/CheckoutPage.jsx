import axios from 'axios';
import BASE_URL from "../config/api";
import { useState, useEffect } from 'react';

import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

import { CheckoutHeader } from './CheckoutHeader';
import './CheckoutHeader.css';
import './CheckoutPage.css';

export function CheckoutPage({ cart,loadCart }) {

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const fetchCheckoutData= async ()=>{
            const res=await axios.get(`${BASE_URL}/api/delivery-options?expand=estimatedDeliveryTime`)
            setDeliveryOptions(res.data);
            
        };
        fetchCheckoutData();
        
    }, []); //This will run only once
    
    useEffect(() => {
        const fetchPaymentSummary = async () =>{
            const pay_res = await axios.get(`${BASE_URL}/api/payment-summary`);
            setPaymentSummary(pay_res.data);
        };
        fetchPaymentSummary();
    },[cart]);
    //whenever the cart changes it will re-run the useEffect and it will update payment Summary

    return (
        <>
            <link rel="icon" type="image/svg+xml" href="cart-favicon.png"></link>
            <title>Checkout</title>
            <CheckoutHeader cart={cart} />
            <div className="checkout-page">
                <div className="page-title">Review your order

                </div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                </div>
            </div>
        </>

    );

}
