import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        localStorage.clear();
        navigate('/login');
    }

    const { name } = JSON.parse(localStorage.getItem('user') as string);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                {/* Left-aligned logo */}
                <Link className="navbar-brand" to="/">
                    Ecommerce Shop
                </Link>

                {/* Right-aligned cart and orders */}
                <div className="ml-auto">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="nav-link" onClick={handleLogoutClick}>
                                Logout
                            </button>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/orders">
                                Orders
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <i className="bi bi-cart-fill"></i> Cart
                            </Link>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link">{name}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
