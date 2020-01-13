const mongoose = require('mongoose');
const Address = require('../models/address.model.js');

const ShippingDetailsSchema = mongoose.Schema({
    address_type: String,
    shipping_address: Address.schema
}, {
    timestamps: true
});

module.exports = mongoose.model('ShippingDetails', ShippingDetailsSchema);

