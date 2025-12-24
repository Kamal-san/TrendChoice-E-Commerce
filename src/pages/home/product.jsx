import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


import { useState } from "react";


import { formatMoney} from "../../utils/money";
import CheckmarkIcon from '../../assets/images/icons/checkmark.png';

export function Product({product, loadCart}) {
    const [quantity,setQuantity] = useState(1);

    const [showAddedMessage , setShowAddedMessage ]= useState(false);

    const addToCart = async () => {
                await axios.post(`${BASE_URL}/api/cart-items`,
                    {
                        productId: product.id,
                        quantity: quantity
                    });
                await loadCart();
            setShowAddedMessage(true);

            setTimeout(() => {
                setShowAddedMessage(false)
            },3000);

            };
        // axios.post = when we send request to the backend,we set the url path
        // based on the url path,the backend can do different things
        // /api/cart-items - gives the cart items
        // /api/products = gives the products
        // every request has a type Http Methods(Get,Post,Put ,Delete) and a url path
        // to determine what the backend does

        

    const selectQuantity =(event) => {
                    const quantitySelected = Number(event.target.value);
                    setQuantity(quantitySelected)
                }
            

    return (
        <div className="product-container">
            <div className="product-image-container">
                <img className="product-image"
                    src={product.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                {formatMoney(product.priceCents)}
            </div>

            <div className="product-quantity-container">
                <select value={quantity} onChange={selectQuantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart" style={{
                opacity : showAddedMessage ? 1: 0
            }}>
                <img src={CheckmarkIcon} />
                Added
            </div>

            <button className="add-to-cart-button button-primary" onClick= {addToCart}>
                Add to Cart
            </button>
        </div>
    );

}

