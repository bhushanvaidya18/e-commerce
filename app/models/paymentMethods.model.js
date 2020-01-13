const mongoose = require('mongoose');

const PaymentMethodsSchema = mongoose.Schema({
    card_number: String,
    wallet_id: String,
    payment_method_details: String
}, {
    timestamps: true
});

module.exports = mongoose.model('PaymentMethods', PaymentMethodsSchema);

