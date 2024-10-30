const mongoose = require('mongoose');

const itemsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the item name"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the price"]
    },
    size: {
        type: String,
        required: [true, "Please enter the size"]
    },
    gender: {
        type: String,
        required: [true, "Please specify the gender category"]
    },
    description: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: [true, "Please enter the quantity"]
    },
    imgSrc: {
        type: String,
        required: [true, "Please provide an image source"]
    },
    tags: {
        type: [String],
        required: [true, "Please specify tags for the item"]
    },
    supplier: {
        type: String, 
    },
});

const Item = mongoose.model('items', itemsSchema);

module.exports = Item;
