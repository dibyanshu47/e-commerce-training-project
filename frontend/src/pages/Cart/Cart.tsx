import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {

    const navigate = useNavigate();

    const { token } = JSON.parse(localStorage.getItem('user') as string);

    const [cartItems, setCartItems] = useState([] as any);

    useEffect(() => {
        const getCart = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/customer/cart', { headers: { 'Authorization': `Bearer ${token}` } });
                console.log(data);
                setCartItems(data.items);
            } catch (error: any) {
                console.log('Error while fetching cart:', error.message);
            }
        }
        getCart();
    }, [token])

    // Calculate the total price of items in the cart
    const calculateTotal = () => {
        return cartItems.reduce((total: any, item: any) => total + item.product.price * item.quantity, 0);
    };

    const handleUpdateQuantity = async (id: any, q: any) => {
        try {
            axios.put('http://localhost:8000/customer/cart', { productId: id, quantity: q }, { headers: { 'Authorization': `Bearer ${token}` } })
            const updatedCartItems = cartItems.map((item: any) =>
                item.product._id === id
                    ? { ...item, quantity: parseInt(q) }
                    : item
            );
            setCartItems(updatedCartItems);
        } catch (error: any) {
            console.log('Error while updating cart:', error.message);
        }
    }

    const handleRemoveFromCart = async (id: any) => {
        // Remove the item from the cart
        try {
            await axios.delete(`http://localhost:8000/customer/cart/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
            const updatedCartItems = cartItems.filter((item: any) => item.product._id !== id);
            setCartItems(updatedCartItems);
        } catch (error: any) {
            console.log('Error while deleting from cart:', error.message);
        }
    };

    const placeOrder = async () => {
        if (cartItems.length === 0) return;
        try {
            const products = cartItems.map((item: any) => ({
                product: item.product._id,
                quantity: item.quantity
            }))
            await axios.post('http://localhost:8000/customer/order', { products }, { headers: { 'Authorization': `Bearer ${token}` } });
            await axios.delete('http://localhost:8000/customer/cart', { headers: { 'Authorization': `Bearer ${token}` } });
            navigate('/orders');
        } catch (error: any) {
            console.log('Error while creating order:', error.message);
        }
    }

    return (
        <div className="container navbar-spacing">
            <div className="row">
                <div className="col">
                    <h2>Your Cart</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item: any) => (
                                <tr key={item.product._id}>
                                    <td>
                                        <img
                                            src={item.product.thumbnail}
                                            alt={item.product.name}
                                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                                        />
                                    </td>
                                    <td>{item.product.name}</td>
                                    <td>${item.product.price.toFixed(2)}</td>
                                    <td>
                                        <select
                                            value={item.quantity}
                                            onChange={(e) => handleUpdateQuantity(item.product._id, e.target.value)}
                                        >
                                            {[1, 2, 3, 4, 5, 6].map((quantity) => (
                                                <option key={quantity} value={quantity}>
                                                    {quantity}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleRemoveFromCart(item.product._id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-end">
                        <h4>Total: ${calculateTotal().toFixed(2)}</h4>
                        <button className="btn btn-primary" onClick={placeOrder}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
