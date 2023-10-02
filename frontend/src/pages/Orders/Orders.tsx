import React, { useState } from 'react';

const Orders: React.FC = () => {
    // Sample order history data with product images for demonstration purposes
    const initialOrderHistory = [
        {
            id: 1,
            date: '2023-01-15',
            items: [
                {
                    name: 'Product 1',
                    price: 10.99,
                    quantity: 2,
                    imageUrl: 'https://m.media-amazon.com/images/I/618Bb+QzCmL._SL1500_.jpg',
                },
                {
                    name: 'Product 2',
                    price: 19.99,
                    quantity: 1,
                    imageUrl: 'https://m.media-amazon.com/images/I/81LskAU5h1L._SL1500_.jpg',
                },
            ],
            total: 41.97,
        },
        {
            id: 2,
            date: '2023-02-20',
            items: [
                {
                    name: 'Product 3',
                    price: 5.99,
                    quantity: 3,
                    imageUrl: 'https://m.media-amazon.com/images/I/712CzUClvjL._SL1500_.jpg',
                },
            ],
            total: 17.97,
        },
    ];

    const [orderHistory, setOrderHistory] = useState(initialOrderHistory);

    return (
        <div className="container navbar-spacing">
            <div className="row">
                <div className="col">
                    <h2>Order History</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Items</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderHistory.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.date}</td>
                                    <td>
                                        <ul>
                                            {order.items.map((item, index) => (
                                                <li key={index}>
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        style={{
                                                            maxWidth: '50px',
                                                            maxHeight: '50px',
                                                            marginRight: '10px',
                                                        }}
                                                    />
                                                    {item.name} (Qty: {item.quantity}) - ${item.price.toFixed(2)}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>${order.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
