import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles.css';
import Loading from '../../components/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';


const ProductDetails: React.FC = () => {

    const { token } = JSON.parse(localStorage.getItem('user') as string);

    const { productId } = useParams();
    const [product, setProduct] = useState(null as any);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/customer/products/${productId}`, { headers: { 'Authorization': `Bearer ${token}` } })
                setProduct(data);
                setLoading(false);
            } catch (error: any) {
                console.log('Error while fetching product details:', error.message);
            }
        }
        getProductDetails();
    }, [token, productId])

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newQuantity = parseInt(e.target.value, 10);
        setQuantity(newQuantity);
    };

    const addToCart = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND}/customer/cart/`, { productId, quantity }, { headers: { 'Authorization': `Bearer ${token}` } })
            toast.success(`${product.name} Added to Cart`)
        } catch (error: any) {
            console.log('Error while adding to cart:', error.message);
        }
    }

    return (
        <div className="container navbar-spacing">
            <ToastContainer />
            {loading ? <Loading /> : (
                <div className="row">
                    <div className="col-md-6">
                        <div id="product-images-carousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                {product.imageUrls.map((image: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`carousel-item${index === 0 ? ' active' : ''}`}
                                    >
                                        <img src={image.imageUrl} className="d-block w-100" alt={`Product ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                            <a
                                className="carousel-control-prev"
                                href="#product-images-carousel"
                                role="button"
                                data-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className="carousel-control-next"
                                href="#product-images-carousel"
                                role="button"
                                data-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        {/* Add more product details here */}
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">
                                Quantity
                            </label>
                            <select
                                className="form-select"
                                id="quantity"
                                name="quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                            >
                                {[...Array(6)].map((_, index) => (
                                    <option key={index} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className="btn btn-primary mr-2" onClick={addToCart}>
                            Add to Cart
                        </button>
                        {/* Add more product details here */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
