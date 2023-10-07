import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import Navbar from '../../components/Navbar/Navbar';

const Orders: React.FC = () => {

    const { token } = JSON.parse(localStorage.getItem('user') as string);

    const [orderHistory, setOrderHistory] = useState([] as any);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getOrderHistory = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/customer/order`, { headers: { 'Authorization': `Bearer ${token}` } });
                setOrderHistory(data);
                setLoading(false);
            } catch (error: any) {
                console.log('Error while fetching order', error.message);
            }
        }
        getOrderHistory();
    }, [token])

    // Function to format a date string in "dd-mm-yyyy" format
    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    };

    // Calculate the total price of items in the cart
    const calculateTotal = (products: any) => {
        return products.reduce((total: any, item: any) => total + item.product.price * item.quantity, 0);
    };

    return (
        <>
            <Navbar />
            <div className="container navbar-spacing">
                <div className="row">
                    <div className="col">
                        <h2>Order History</h2>
                        {loading ? <Loading /> : (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderHistory.map((order: any) => (
                                        <tr key={order._id}>
                                            <td>{formatDate(order.orderDate)}</td>
                                            {/* <td>
                                        <div>
                                            <p>{order.shippingAddress.addressLine1}</p>
                                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                                        </div>
                                    </td> */}
                                            <td>
                                                <ul>
                                                    {order.products.map((item: any, index: any) => (
                                                        <li key={index}>
                                                            <img
                                                                src={item.product.thumbnail}
                                                                alt={item.name}
                                                                style={{
                                                                    maxWidth: '50px',
                                                                    maxHeight: '50px',
                                                                    marginRight: '10px',
                                                                }}
                                                            />
                                                            {item.product.name} (Qty: {item.quantity}) - ${item.product.price.toFixed(2)}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>${calculateTotal(order.products).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Orders;
