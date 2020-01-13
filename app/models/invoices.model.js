const mongoose = require('mongoose');
const InvoicesStatusCodes = require('../models/invoicesStatusCodes.model.js');
const BillingDetails = require('../models/billingDetails.model.js');

const InvoicesSchema = mongoose.Schema({
    invoice_status_code: InvoicesStatusCodes.schema,
    invoice_date: Date,
    invoice_details: String,
    billing_address: BillingDetails.schema
}, {
    timestamps: true
});

module.exports = mongoose.model('Invoices', InvoicesSchema);

