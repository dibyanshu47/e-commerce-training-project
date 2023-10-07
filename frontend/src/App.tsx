import { Routes, Route, useLocation } from 'react-router-dom';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Orders/Orders';
import Navbar from './components/Navbar/Navbar';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Products from './pages/Products/Products';
import ProtectedRoute from './pages/ProtectedRoute';

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
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                <Route path="/products/:productId" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            </Routes>
        </>
    );
};

export default App;
