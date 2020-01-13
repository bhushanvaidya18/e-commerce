const mongoose = require('mongoose');
const Product = require('../models/product.model.js');
const OrderItemsStatusCodes = require('../models/orderItemsStatusCodes.model.js');

const OrderItemsSchema = mongoose.Schema({
    order_item: Product.schema,
    order_item_status_code: OrderItemsStatusCodes.schema,
    order_item_quantity: Number,
    order_item_price: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('OrderItems', OrderItemsSchema);

