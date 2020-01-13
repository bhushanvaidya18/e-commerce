const mongoose = require('mongoose');

const CartItemsStatusCodesSchema = mongoose.Schema({
    code: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('CartItemsStatusCodes', CartItemsStatusCodesSchema);

