import React, { useState } from 'react';

const CartPage: React.FC = () => {
    // Sample cart items with product images for demonstration purposes
    const initialCartItems = [
        {
            id: 1,
            name: 'Product 1',
            price: 10.99,
            quantity: 2,
            imageUrl: 'https://m.media-amazon.com/images/I/61bX2AoGj2L._SL1500_.jpg',
        },
        {
            id: 2,
            name: 'Product 2',
            price: 19.99,
            quantity: 1,
            imageUrl: 'https://m.media-amazon.com/images/I/618Bb+QzCmL._SL1500_.jpg',
        },
        {
            id: 3,
            name: 'Product 3',
            price: 5.99,
            quantity: 3,
            imageUrl: 'https://m.media-amazon.com/images/I/81LskAU5h1L._SL1500_.jpg',
        },
    ];

    const [cartItems, setCartItems] = useState(initialCartItems);

    // Calculate the total price of items in the cart
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleAddToCart = (id: number) => {
        // Find the item in the cart
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });

        setCartItems(updatedCartItems);
    };

    const handleRemoveFromCart = (id: number) => {
        // Remove the item from the cart
        const updatedCartItems = cartItems.filter((item) => item.id !== id);

        setCartItems(updatedCartItems);
    };

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
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleAddToCart(item.id)}
                                        >
                                            Add
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleRemoveFromCart(item.id)}
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
                        <button className="btn btn-primary">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
