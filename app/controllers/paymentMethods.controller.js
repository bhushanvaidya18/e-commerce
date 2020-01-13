const PaymentMethods = require('../models/paymentMethods.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const paymentMethods = new PaymentMethods(req.body);
    paymentMethods.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the paymentMethods."
        });
    });
};

exports.findAll = (req, res) => {
    PaymentMethods.find()
    .then(paymentMethods => {
        res.send(paymentMethods);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving paymentMethodss."
        });
    });
};

exports.findOne = (req, res) => {
    PaymentMethods.findById(req.params.paymentMethodsId)
    .then(paymentMethods => {
        if(!paymentMethods) {
            return res.status(404).send({
                message: "paymentMethods not found with id " + req.params.paymentMethodsId
            });            
        }
        res.send(paymentMethods);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "paymentMethods not found with id " + req.params.paymentMethodsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving paymentMethods with id " + req.params.paymentMethodsId
        });
    });
};

exports.update = (req, res) => {
    PaymentMethods.findByIdAndUpdate(req.params.paymentMethodsId, req.body, {new: true})
    .then(paymentMethods => {
        if(!paymentMethods) {
            return res.status(404).send({
                message: "paymentMethods not found with id " + req.params.paymentMethodsId
            });
        }
        res.send(paymentMethods);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "paymentMethods not found with id " + req.params.paymentMethodsId
            });                
        }
        return res.status(500).send({
            message: "Error updating paymentMethods with id " + req.params.paymentMethodsId
        });
    });
};

exports.delete = (req, res) => {
    PaymentMethods.findByIdAndRemove(req.params.paymentMethodsId)
    .then(paymentMethods => {
        if(!paymentMethods) {
            return res.status(404).send({
                message: "paymentMethods not found with id " + req.params.paymentMethodsId
            });
        }
        res.send({message: "paymentMethods deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "paymentMethods not found with id " + req.params.paymentMethodsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete paymentMethods with id " + req.params.paymentMethodsId
        });
    });
};

