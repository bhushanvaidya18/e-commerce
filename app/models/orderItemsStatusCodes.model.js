const mongoose = require('mongoose');

const OrderItemsStatusCodesSchema = mongoose.Schema({
    code: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('OrderItemsStatusCodes', OrderItemsStatusCodesSchema);

