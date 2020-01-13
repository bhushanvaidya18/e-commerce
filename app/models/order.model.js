const mongoose = require('mongoose');
const Customer = require('../models/customer.model.js');
const OrderItems = require('../models/orderItems.model.js');
const OrderStatusCodes = require('../models/orderStatusCodes.model.js');
const Invoices = require('../models/invoices.model.js');

const OrderSchema = mongoose.Schema({
    customer: Customer.schema,
    order_items: [ OrderItems.schema ], 
    order_status_code: OrderStatusCodes.schema,
    invoice: Invoices.schema,
    order_placed_date: Date,
    order_details: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);

