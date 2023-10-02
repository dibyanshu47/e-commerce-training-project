import React from 'react';
import Product from './Product';

interface ProductProps {
    name: string;
    price: number;
    description: string;
    imageUrl: string; // Add imageUrl to represent the image URL
}

interface ProductsProps {
    products: ProductProps[];
}

const ProductList: React.FC<ProductsProps> = ({ products }) => {
    return (
        <div className="container">
            <h1>Product Listing</h1>
            <div className="row">
                {products.map((product, index) => (
                    <div className="col-md-4" key={index}>
                        <Product {...product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
