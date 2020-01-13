const mongoose = require('mongoose');
const Product = require('../models/product.model.js');
const CartItemsStatusCodes = require('../models/cartItemsStatusCodes.model.js');

const CartItemsSchema = mongoose.Schema({
    cart_item: Product.schema,
    cart_item_status_code: CartItemsStatusCodes.schema,
    cart_item_quantity: Number,
    cart_item_price: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('CartItems', CartItemsSchema);

