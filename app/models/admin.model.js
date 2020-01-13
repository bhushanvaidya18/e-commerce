const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const AdminSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
}, {
    timestamps: true
});
// hash passenger admin before saving into database
AdminSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('Admin', AdminSchema);

