const Address = require('../models/address.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const address = new Address(req.body);
    address.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the address."
        });
    });
};

exports.findAll = (req, res) => {
    Address.find()
    .then(addresss => {
        res.send(addresss);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving addresss."
        });
    });
};

exports.findOne = (req, res) => {
    Address.findById(req.params.addressId)
    .then(address => {
        if(!address) {
            return res.status(404).send({
                message: "address not found with id " + req.params.addressId
            });            
        }
        res.send(address);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "address not found with id " + req.params.addressId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving address with id " + req.params.addressId
        });
    });
};

exports.update = (req, res) => {
    Address.findByIdAndUpdate(req.params.addressId, req.body, {new: true})
    .then(address => {
        if(!address) {
            return res.status(404).send({
                message: "address not found with id " + req.params.addressId
            });
        }
        res.send(address);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "address not found with id " + req.params.addressId
            });                
        }
        return res.status(500).send({
            message: "Error updating address with id " + req.params.addressId
        });
    });
};

exports.delete = (req, res) => {
    Address.findByIdAndRemove(req.params.addressId)
    .then(address => {
        if(!address) {
            return res.status(404).send({
                message: "address not found with id " + req.params.addressId
            });
        }
        res.send({message: "address deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "address not found with id " + req.params.addressId
            });                
        }
        return res.status(500).send({
            message: "Could not delete address with id " + req.params.addressId
        });
    });
};

