const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const TrackingDetails = require('../models/trackingDetails.model.js');

const DispatcherSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tracking_details: TrackingDetails.schema
}, {
    timestamps: true
});
// hash passenger dispatcher before saving into database
DispatcherSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});
module.exports = mongoose.model('Dispatcher', DispatcherSchema);

