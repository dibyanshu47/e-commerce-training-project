import React from 'react';
import ProductList from '../../components/Products/Products';

const Home: React.FC = () => {
    const products = [
        {
            name: 'Product 1',
            price: 19.99,
            description: 'Description for Product 1',
            imageUrl: 'https://m.media-amazon.com/images/I/61bX2AoGj2L._SL1500_.jpg',
        },
        {
            name: 'Product 2',
            price: 29.99,
            description: 'Description for Product 2',
            imageUrl: 'https://m.media-amazon.com/images/I/618Bb+QzCmL._SL1500_.jpg',
        },
        {
            name: 'Product 2',
            price: 29.99,
            description: 'Description for Product 2',
            imageUrl: 'https://m.media-amazon.com/images/I/712CzUClvjL._SL1500_.jpg',
        },
        {
            name: 'Product 2',
            price: 29.99,
            description: 'Description for Product 2',
            imageUrl: 'https://m.media-amazon.com/images/I/518V0pd9z4L._UL1000_.jpg',
        },
        {
            name: 'Product 2',
            price: 29.99,
            description: 'Description for Product 2',
            imageUrl: 'https://m.media-amazon.com/images/I/81LskAU5h1L._SL1500_.jpg',
        },
        // Add more products as needed
    ];

    return (
        <div className="container navbar-spacing">
            <ProductList products={products} />
        </div>
    );
};

export default Home;
