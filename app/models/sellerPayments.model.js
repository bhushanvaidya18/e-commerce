const mongoose = require('mongoose');
const Address = require('../models/address.model.js');

const SellerPaymentsSchema = mongoose.Schema({
    payment_type: String,
    seller_address: Address.schema
}, {
    timestamps: true
});

module.exports = mongoose.model('SellerPayments', SellerPaymentsSchema);

