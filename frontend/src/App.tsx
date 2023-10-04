import { Routes, Route, useLocation } from 'react-router-dom';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Orders/Orders';
import Navbar from './components/Navbar/Navbar';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Products from './pages/Products/Products';

const App = () => {
    // Get the current route location using useLocation from react-router-dom
    const location = useLocation();

    // Define an array of routes where Navbar should not be displayed
    const routesWithoutNavbar = ['/login', '/register'];

    // Check if the current route is in the routesWithoutNavbar array
    const isNavbarVisible = !routesWithoutNavbar.includes(location.pathname);

    return (
        <>
            {isNavbarVisible && <Navbar />}
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/products/:productId" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
};

export default App;
