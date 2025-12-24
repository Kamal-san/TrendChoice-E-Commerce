import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


import { Fragment} from "react";
import { Link } from 'react-router-dom';


import dayjs from "dayjs";

import BuyAgainIcon from '../../assets/images/icons/buy-again.png'

export function OrderDetailsGrid({order,loadCart})
{
    return(
            <div className="order-details-grid">

        {order.products.map((orderProduct) => {
            const buyAgain = async() => {
                await axios.post(`${BASE_URL}/api/cart-items`,
                {
                    productId:orderProduct.product.id,
                    quantity: 1
                }
            );

            await loadCart();
            };

            return (
                <Fragment key={orderProduct.product.id} >
                    <div className="product-image-container">
                        <img src={orderProduct.product.image} />
                    </div>

                    <div className="product-details">
                        <div className="product-name">
                            {orderProduct.product.name}
                        </div>
                        <div className="product-delivery-date">
                            Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                        </div>
                        <div className="product-quantity">
                            Quantity: {orderProduct.quantity}
                        </div>
                        <button className="buy-again-button button-primary" onClick={buyAgain}>
                            <img className="buy-again-icon" src={BuyAgainIcon} />
                            <span className="buy-again-message" >Buy Again</span>
                        </button>
                    </div>

                    <div className="product-actions">
                        <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
                            <button className="track-package-button button-secondary">
                                Track package
                            </button>
                        </Link>
                    </div>
                </Fragment>

                                );
                            })}
                        </div>
    );

}

