import { useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';

//import MobileLogoWhite from '../assets/images/TC-logo-white.png';
import LogoWhite from '../assets/images/TrendChoice-white-logo.png';
import './Header.css';

export function Header({cart}) {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const searchText =searchParams.get('search');

    const[search,setSearch] = useState(searchText || ''); // if search text doesn't exist it will use default value of ''

    const updateSearchInput = (event) => {
        setSearch(event.target.value);
    };

    const searchProducts = () => {
        navigate(`/?search=${search}`);

    }

    let totalQuantity=0;
    cart.forEach((cartItem)=>{
            totalQuantity += cartItem.quantity;
    })
    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    {/*<img className='mobile-logo-white' src={MobileLogoWhite} />*/}
                    <img className="logo"
                        src={LogoWhite} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" 
                value={search} onChange={updateSearchInput} />

                <button className="search-button" onClick={searchProducts}>
                    <img className="search-icon" src={SearchIcon}  />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">

                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    );

}

