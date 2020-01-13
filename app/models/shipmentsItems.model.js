const mongoose = require('mongoose');
const OrderItems = require('../models/orderItems.model.js');

const ShipmentsItemsSchema = mongoose.Schema({
    order_item: OrderItems.schema
}, {
    timestamps: true
});

module.exports = mongoose.model('ShipmentsItems', ShipmentsItemsSchema);

