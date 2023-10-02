import React from 'react';

interface ProductProps {
    name: string;
    price: number;
    description: string;
    imageUrl: string; // Add imageUrl to represent the image URL
}

const Product: React.FC<ProductProps> = ({ name, price, description, imageUrl }) => {
    return (
        <div className="card">
            <img src={imageUrl} className="card-img-top" alt={name} style={{ height: '300px', objectFit: 'contain' }} /> {/* Display the product image */}
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text">${price}</p>
                <span className="btn btn-primary">
                    Add to Cart
                </span>
            </div>
        </div>
    );
};

export default Product;
