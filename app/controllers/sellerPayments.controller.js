const SellerPayments = require('../models/sellerPayments.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const sellerPayments = new SellerPayments(req.body);
    sellerPayments.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the sellerPayments."
        });
    });
};

exports.findAll = (req, res) => {
    SellerPayments.find()
    .then(sellerPaymentss => {
        res.send(sellerPaymentss);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving sellerPaymentss."
        });
    });
};

exports.findOne = (req, res) => {
    SellerPayments.findById(req.params.sellerPaymentsId)
    .then(sellerPayments => {
        if(!sellerPayments) {
            return res.status(404).send({
                message: "sellerPayments not found with id " + req.params.sellerPaymentsId
            });            
        }
        res.send(sellerPayments);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "sellerPayments not found with id " + req.params.sellerPaymentsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving sellerPayments with id " + req.params.sellerPaymentsId
        });
    });
};

exports.update = (req, res) => {
    SellerPayments.findByIdAndUpdate(req.params.sellerPaymentsId, req.body, {new: true})
    .then(sellerPayments => {
        if(!sellerPayments) {
            return res.status(404).send({
                message: "sellerPayments not found with id " + req.params.sellerPaymentsId
            });
        }
        res.send(sellerPayments);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "sellerPayments not found with id " + req.params.sellerPaymentsId
            });                
        }
        return res.status(500).send({
            message: "Error updating sellerPayments with id " + req.params.sellerPaymentsId
        });
    });
};

exports.delete = (req, res) => {
    SellerPayments.findByIdAndRemove(req.params.sellerPaymentsId)
    .then(sellerPayments => {
        if(!sellerPayments) {
            return res.status(404).send({
                message: "sellerPayments not found with id " + req.params.sellerPaymentsId
            });
        }
        res.send({message: "sellerPayments deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "sellerPayments not found with id " + req.params.sellerPaymentsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete sellerPayments with id " + req.params.sellerPaymentsId
        });
    });
};

