import axios from'axios';
import { Routes,Route } from 'react-router-dom';
import { useEffect,useState}  from 'react';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/tracking/TrackingPage';
import { NotFoundPage } from  './pages/not found page/NotFoundPage'
import './App.css'

window.axios = axios;

function App() {
  const [cart,setCart] = useState([]);
  // loadCart helps us to loading cart without refreshing it
  // also this is lifting the stage up - allows us share this across all components
  const loadCart = async()=>{
        const res=   await axios.get('/api/cart-items?expand=product') 
      // ? - Query parameter -> lets us add additional info to the request
        setCart(res.data);

    };
  useEffect(()=>{
    loadCart();      
  },[])

  return (
    <Routes>
      <Route index 
      element={<HomePage cart={cart} loadCart={loadCart} />}/>
      <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />}/>
      <Route path="/orders" element={<OrdersPage cart={cart} loadCart={loadCart} />}/>
      <Route path="tracking/:orderId/:productID" element={<TrackingPage cart={cart} />}/>
      <Route path="*" element={<NotFoundPage cart={cart} />} />

      
    </Routes>
    
  )
}

export default App
