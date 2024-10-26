const mongoose = require('mongoose');

// Define the order schema
const orderSchema = mongoose.Schema({
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'items', // Reference to the 'items' collection
            required: [true, "Order must contain at least one item"]
        }
    ],
    first_name: {
        type: String,
        required: [true, "Please provide the first name for delivery"]
    },
    last_name: {
        type: String,
        required: [true, "Please provide the last name for delivery"]
    },
    price: {
        type: Number,
        required: [true, "Please provide the total price for the order"]
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'canceled'],
        default: 'pending',
        required: [true, "Please specify the order status"]
    },
    city: {
        type: String,
        required: [true, "Please provide the city for delivery"]
    },
    street: {
        type: String,
        required: [true, "Please provide the street for delivery"]
    },
    number: {
        type: String,
        required: [true, "Please provide the house/building number for delivery"]
    },
    phone: {
        type: String,
        required: [true, "Please provide a contact phone number"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
