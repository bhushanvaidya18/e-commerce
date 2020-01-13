const mongoose = require('mongoose');
const ProductTypes = require('../models/productTypes.model.js');
const Seller = require('../models/seller.model.js');


const ProductSchema = mongoose.Schema({
    sku_id: String,
    name: String,
    product_type: ProductTypes.schema,
    brand: String,
    colour: String,
    size: String,
    model: String,
    seller: Seller.schema,
    price: Number,
    quantity: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);

