const mongoose = require('mongoose');

const ProductTypesSchema = mongoose.Schema({
    product_type_code: String
}, {
    timestamps: true
});

module.exports = mongoose.model('ProductTypes', ProductTypesSchema);

