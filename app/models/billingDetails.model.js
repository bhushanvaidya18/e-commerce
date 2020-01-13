const mongoose = require('mongoose');
const Address = require('../models/address.model.js');

const BillingDetailsSchema = mongoose.Schema({
    billing_address: Address.schema
}, {
    timestamps: true
});

module.exports = mongoose.model('BillingDetails', BillingDetailsSchema);

