import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Product from '../../components/Product/Product';
import Loading from '../../components/Loading/Loading';

const Products: React.FC = () => {

    const { token } = JSON.parse(localStorage.getItem('user') as string);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/customer/products`, { headers: { 'Authorization': `Bearer ${token}` } })
                setProducts(data);
                setLoading(false);
            } catch (error: any) {
                console.log('Error while fetching products:', error.message);
            }
        }
        getProducts();
    }, [token])


    return (
        <div className="container navbar-spacing">
            <h1>Product Listing</h1>
            {loading ? <Loading /> : (
                <div className="row">
                    {products.map((product: any, index) => (
                        <div className="col-md-4" key={index}>
                            <Product id={product._id} name={product.name} price={product.price} thumbnail={product.thumbnail} />
                        </div>
                    ))}
                </div>

            )}
        </div>
    );
};

export default Products;
