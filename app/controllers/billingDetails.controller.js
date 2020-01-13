const BillingDetails = require('../models/billingDetails.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const billingDetails = new BillingDetails(req.body);
    billingDetails.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the billingDetails."
        });
    });
};

exports.findAll = (req, res) => {
    BillingDetails.find()
    .then(billingDetailss => {
        res.send(billingDetailss);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving billingDetailss."
        });
    });
};

exports.findOne = (req, res) => {
    BillingDetails.findById(req.params.billingDetailsId)
    .then(billingDetails => {
        if(!billingDetails) {
            return res.status(404).send({
                message: "billingDetails not found with id " + req.params.billingDetailsId
            });            
        }
        res.send(billingDetails);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "billingDetails not found with id " + req.params.billingDetailsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving billingDetails with id " + req.params.billingDetailsId
        });
    });
};

exports.update = (req, res) => {
    BillingDetails.findByIdAndUpdate(req.params.billingDetailsId, req.body, {new: true})
    .then(billingDetails => {
        if(!billingDetails) {
            return res.status(404).send({
                message: "billingDetails not found with id " + req.params.billingDetailsId
            });
        }
        res.send(billingDetails);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "billingDetails not found with id " + req.params.billingDetailsId
            });                
        }
        return res.status(500).send({
            message: "Error updating billingDetails with id " + req.params.billingDetailsId
        });
    });
};

exports.delete = (req, res) => {
    BillingDetails.findByIdAndRemove(req.params.billingDetailsId)
    .then(billingDetails => {
        if(!billingDetails) {
            return res.status(404).send({
                message: "billingDetails not found with id " + req.params.billingDetailsId
            });
        }
        res.send({message: "billingDetails deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "billingDetails not found with id " + req.params.billingDetailsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete billingDetails with id " + req.params.billingDetailsId
        });
    });
};

