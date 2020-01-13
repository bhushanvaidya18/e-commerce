const mongoose = require('mongoose');
const Address = require('../models/address.model.js');

const TrackingDetailsSchema = mongoose.Schema({
    name: String,
    tracking_address: Address.schema
}, {
    timestamps: true
});

module.exports = mongoose.model('TrackingDetails', TrackingDetailsSchema);

