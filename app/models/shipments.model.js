const mongoose = require('mongoose');
const ShipmentsItems = require('../models/shipmentsItems.model.js');
const ShippingDetails = require('../models/shippingDetails.model.js');

const ShipmentsSchema = mongoose.Schema({
    shipment_items: [ ShipmentsItems.schema ],
    shipping_address: ShippingDetails.schema
}, {
    timestamps: true
});

module.exports = mongoose.model('Shipments', ShipmentsSchema);

