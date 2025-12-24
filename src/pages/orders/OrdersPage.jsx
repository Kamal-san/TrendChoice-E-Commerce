import axios from 'axios';
import BASE_URL from "../config/api";

import { useState, useEffect} from 'react';

import { Header } from '../../shared-components/Header';
import { OrdersGrid } from './OrdersGrid';

import './OrdersPage.css';
export function OrdersPage({ cart,loadCart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrdersData= async () => {
            const res=await axios.get(`${BASE_URL}/api/orders?expand=products`);
            setOrders(res.data);
        };

        fetchOrdersData();
        

    }, [])

    return (
        <>
            <link rel="icon" type="image/svg+xml" href="orders-favicon.png"></link>
            <title>Orders</title>
            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} loadCart={loadCart} />
            </div>
        </>
    );

}
