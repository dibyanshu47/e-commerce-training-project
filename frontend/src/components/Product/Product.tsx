import React from 'react';
import { Link } from 'react-router-dom';

interface ProductProps {
    id: string;
    name: string;
    price: number;
    thumbnail: string; // Add imageUrl to represent the image URL
}

const Product: React.FC<ProductProps> = ({ id, name, price, thumbnail }) => {
    return (
        <div className="card">
            <Link to={`/products/${id}`}>
                <img src={thumbnail} className="card-img-top" alt={name} style={{ height: '300px', objectFit: 'contain' }} /> {/* Display the product image */}
            </Link>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">${price}</p>
            </div>
        </div>
    );
};

export default Product;
