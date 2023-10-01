import mongoose from 'mongoose';

// Create the Order schema
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who placed the order
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the product in the order
            quantity: { type: Number, required: true },
            unitPrice: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
        addressLine1: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
    },
    // will be implemented later
    // paymentInfo: {
    //     cardNumber: { type: String, required: true }, // You might consider storing only a reference to the payment method used instead of the actual card details for security.
    //     expirationDate: { type: String, required: true },
    //     nameOnCard: { type: String, required: true },
    // },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Delivered' }, // default to delivered such that we can see order history. we will implement this feature later
});

// Create and export the Order model
const Order = mongoose.model('Order', orderSchema);
export default Order;
