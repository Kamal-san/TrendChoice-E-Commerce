import axios from 'axios';
import BASE_URL from "../config/api";
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/tracking/TrackingPage';
import { NotFoundPage } from './pages/not-found/NotFoundPage';

import './App.css';

window.axios = axios;

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/cart-items?expand=product`
      );
      setCart(res.data);
    } catch (error) {
      console.error("Failed to load cart", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route
        index
        element={<HomePage cart={cart} loadCart={loadCart} />}
      />

      <Route
        path="/checkout"
        element={<CheckoutPage cart={cart} loadCart={loadCart} />}
      />

      <Route
        path="/orders"
        element={<OrdersPage cart={cart} loadCart={loadCart} />}
      />

      <Route
        path="/tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />

      <Route
        path="*"
        element={<NotFoundPage cart={cart} />}
      />
    </Routes>
  );
}

export default App;
