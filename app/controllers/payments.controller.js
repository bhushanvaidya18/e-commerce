const Payments = require('../models/payments.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const payments = new Payments(req.body);
    payments.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the payments."
        });
    });
};

exports.findAll = (req, res) => {
    Payments.find()
    .then(paymentss => {
        res.send(paymentss);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving paymentss."
        });
    });
};

exports.findOne = (req, res) => {
    Payments.findById(req.params.paymentsId)
    .then(payments => {
        if(!payments) {
            return res.status(404).send({
                message: "payments not found with id " + req.params.paymentsId
            });            
        }
        res.send(payments);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "payments not found with id " + req.params.paymentsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving payments with id " + req.params.paymentsId
        });
    });
};

exports.update = (req, res) => {
    Payments.findByIdAndUpdate(req.params.paymentsId, req.body, {new: true})
    .then(payments => {
        if(!payments) {
            return res.status(404).send({
                message: "payments not found with id " + req.params.paymentsId
            });
        }
        res.send(payments);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "payments not found with id " + req.params.paymentsId
            });                
        }
        return res.status(500).send({
            message: "Error updating payments with id " + req.params.paymentsId
        });
    });
};

exports.delete = (req, res) => {
    Payments.findByIdAndRemove(req.params.paymentsId)
    .then(payments => {
        if(!payments) {
            return res.status(404).send({
                message: "payments not found with id " + req.params.paymentsId
            });
        }
        res.send({message: "payments deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "payments not found with id " + req.params.paymentsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete payments with id " + req.params.paymentsId
        });
    });
};

