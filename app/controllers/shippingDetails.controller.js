const ShippingDetails = require('../models/shippingDetails.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const shippingDetails = new ShippingDetails(req.body);
    shippingDetails.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the shippingDetails."
        });
    });
};

exports.findAll = (req, res) => {
    ShippingDetails.find()
    .then(shippingDetails => {
        res.send(shippingDetails);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving shippingDetailss."
        });
    });
};

exports.findOne = (req, res) => {
    ShippingDetails.findById(req.params.shippingDetailsId)
    .then(shippingDetails => {
        if(!shippingDetails) {
            return res.status(404).send({
                message: "shippingDetails not found with id " + req.params.shippingDetailsId
            });            
        }
        res.send(shippingDetails);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "shippingDetails not found with id " + req.params.shippingDetailsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving shippingDetails with id " + req.params.shippingDetailsId
        });
    });
};

exports.update = (req, res) => {
    ShippingDetails.findByIdAndUpdate(req.params.shippingDetailsId, req.body, {new: true})
    .then(shippingDetails => {
        if(!shippingDetails) {
            return res.status(404).send({
                message: "shippingDetails not found with id " + req.params.shippingDetailsId
            });
        }
        res.send(shippingDetails);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "shippingDetails not found with id " + req.params.shippingDetailsId
            });                
        }
        return res.status(500).send({
            message: "Error updating shippingDetails with id " + req.params.shippingDetailsId
        });
    });
};

exports.delete = (req, res) => {
    ShippingDetails.findByIdAndRemove(req.params.shippingDetailsId)
    .then(shippingDetails => {
        if(!shippingDetails) {
            return res.status(404).send({
                message: "shippingDetails not found with id " + req.params.shippingDetailsId
            });
        }
        res.send({message: "shippingDetails deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "shippingDetails not found with id " + req.params.shippingDetailsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete shippingDetails with id " + req.params.shippingDetailsId
        });
    });
};

