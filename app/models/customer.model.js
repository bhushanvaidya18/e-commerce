const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const ShippingDetails = require('../models/shippingDetails.model.js');
const BillingDetails = require('../models/billingDetails.model.js');
const PaymentMethods = require('../models/paymentMethods.model.js');


const CustomerSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    shipping_details: [ ShippingDetails.schema ],
    billing_details: [ BillingDetails.schema ],
    payment_methods: [ PaymentMethods.schema ]
}, {
    timestamps: true
});

// hash passenger customer before saving into database
CustomerSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('Customer', CustomerSchema);

