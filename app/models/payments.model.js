const mongoose = require('mongoose');
const Invoices = require('../models/invoices.model.js');

const PaymentsSchema = mongoose.Schema({
    invoice: Invoices.schema,
    payment_date: Date,
    payment_amount: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Payments', PaymentsSchema);

