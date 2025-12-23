import axios from 'axios';
import { useEffect,useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsGrid } from './ProductsGrid';
import { Header } from '../../shared-components/Header';
import './HomePage.css';


export function HomePage({cart,loadCart}) {
    const [products,setProducts] = useState([]);

    const [searchParams] = useSearchParams();
    
    const search = searchParams.get('search');
    
    useEffect(()=>{
        const getHomeData= async ()=>{
            const urlPath =search ? `/api/products?search=${search}` : '/api/products';
            
        const res= await axios.get(urlPath);
        setProducts(res.data);
    };
    getHomeData();
        
},[search]); //[] -depedency array - used to control when useEffect run ([]= only run once)
    
    return (
        <>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png"></link>
            <title>Trend Choice</title>
            <Header cart={cart} />


            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} /> 
            </div>
        </>

    );
}