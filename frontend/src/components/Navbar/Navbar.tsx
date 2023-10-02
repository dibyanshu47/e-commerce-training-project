import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
                {/* Left-aligned logo */}
                <Link className="navbar-brand" to="/">
                    Ecommerce Shop
                </Link>

                {/* Right-aligned cart and orders */}
                <div className="ml-auto">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link btn" to="/orders">
                                Orders
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <i className="bi bi-cart-fill"></i> Cart
                                <span className="badge bg-primary">{3}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
