const mongoose = require('mongoose');

const OrderStatusCodesSchema = mongoose.Schema({
    code: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('OrderStatusCodes', OrderStatusCodesSchema);

