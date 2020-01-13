const OrderStatusCodes = require('../models/orderStatusCodes.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const orderStatusCodes = new OrderStatusCodes(req.body);
    orderStatusCodes.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the orderStatusCodes."
        });
    });
};

exports.findAll = (req, res) => {
    OrderStatusCodes.find()
    .then(orderStatusCodes => {
        res.send(orderStatusCodes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orderStatusCodess."
        });
    });
};

exports.findOne = (req, res) => {
    OrderStatusCodes.findById(req.params.orderStatusCodesId)
    .then(orderStatusCodes => {
        if(!orderStatusCodes) {
            return res.status(404).send({
                message: "orderStatusCodes not found with id " + req.params.orderStatusCodesId
            });            
        }
        res.send(orderStatusCodes);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "orderStatusCodes not found with id " + req.params.orderStatusCodesId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving orderStatusCodes with id " + req.params.orderStatusCodesId
        });
    });
};

exports.update = (req, res) => {
    OrderStatusCodes.findByIdAndUpdate(req.params.orderStatusCodesId, req.body, {new: true})
    .then(orderStatusCodes => {
        if(!orderStatusCodes) {
            return res.status(404).send({
                message: "orderStatusCodes not found with id " + req.params.orderStatusCodesId
            });
        }
        res.send(orderStatusCodes);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "orderStatusCodes not found with id " + req.params.orderStatusCodesId
            });                
        }
        return res.status(500).send({
            message: "Error updating orderStatusCodes with id " + req.params.orderStatusCodesId
        });
    });
};

exports.delete = (req, res) => {
    OrderStatusCodes.findByIdAndRemove(req.params.orderStatusCodesId)
    .then(orderStatusCodes => {
        if(!orderStatusCodes) {
            return res.status(404).send({
                message: "orderStatusCodes not found with id " + req.params.orderStatusCodesId
            });
        }
        res.send({message: "orderStatusCodes deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "orderStatusCodes not found with id " + req.params.orderStatusCodesId
            });                
        }
        return res.status(500).send({
            message: "Could not delete orderStatusCodes with id " + req.params.orderStatusCodesId
        });
    });
};

