const mongoose = require('mongoose');

const InvoicesStatusCodesSchema = mongoose.Schema({
    code: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('InvoicesStatusCodes', InvoicesStatusCodesSchema);

