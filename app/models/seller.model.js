const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const SellerPayments = require('../models/sellerPayments.model.js');

const SellerSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    payments: SellerPayments.schema
}, {
    timestamps: true
});
// hash passenger seller before saving into database
SellerSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('Seller', SellerSchema);

