const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    name: String,
    address_line_1: String,
    address_line_2: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
    lat: Number,
    lng: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Address', AddressSchema);

