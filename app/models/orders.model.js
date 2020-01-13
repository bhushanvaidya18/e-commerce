const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    orderItems: orderItems,
    lng: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Wallet', OrderSchema);
