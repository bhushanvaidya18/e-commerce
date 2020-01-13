const mongoose = require('mongoose');
const Customer = require('../models/customer.model.js');
const CartItems = require('../models/cartItems.model.js');

const CartSchema = mongoose.Schema({
    customer: Customer.schema,
    cart_items: [ CartItems.schema ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', CartSchema);

