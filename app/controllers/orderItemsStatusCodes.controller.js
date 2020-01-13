const OrderItemsStatusCodes = require('../models/orderItemsStatusCodes.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const orderItemsStatusCodes = new OrderItemsStatusCodes(req.body);
    orderItemsStatusCodes.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the orderItemsStatusCodes."
        });
    });
};

exports.findAll = (req, res) => {
    OrderItemsStatusCodes.find()
    .then(orderItemsStatusCodess => {
        res.send(orderItemsStatusCodess);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orderItemsStatusCodess."
        });
    });
};

exports.findOne = (req, res) => {
    OrderItemsStatusCodes.findById(req.params.orderItemsStatusCodesId)
    .then(orderItemsStatusCodes => {
        if(!orderItemsStatusCodes) {
            return res.status(404).send({
                message: "orderItemsStatusCodes not found with id " + req.params.orderItemsStatusCodesId
            });            
        }
        res.send(orderItemsStatusCodes);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "orderItemsStatusCodes not found with id " + req.params.orderItemsStatusCodesId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving orderItemsStatusCodes with id " + req.params.orderItemsStatusCodesId
        });
    });
};

exports.update = (req, res) => {
    OrderItemsStatusCodes.findByIdAndUpdate(req.params.orderItemsStatusCodesId, req.body, {new: true})
    .then(orderItemsStatusCodes => {
        if(!orderItemsStatusCodes) {
            return res.status(404).send({
                message: "orderItemsStatusCodes not found with id " + req.params.orderItemsStatusCodesId
            });
        }
        res.send(orderItemsStatusCodes);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "orderItemsStatusCodes not found with id " + req.params.orderItemsStatusCodesId
            });                
        }
        return res.status(500).send({
            message: "Error updating orderItemsStatusCodes with id " + req.params.orderItemsStatusCodesId
        });
    });
};

exports.delete = (req, res) => {
    OrderItemsStatusCodes.findByIdAndRemove(req.params.orderItemsStatusCodesId)
    .then(orderItemsStatusCodes => {
        if(!orderItemsStatusCodes) {
            return res.status(404).send({
                message: "orderItemsStatusCodes not found with id " + req.params.orderItemsStatusCodesId
            });
        }
        res.send({message: "orderItemsStatusCodes deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "orderItemsStatusCodes not found with id " + req.params.orderItemsStatusCodesId
            });                
        }
        return res.status(500).send({
            message: "Could not delete orderItemsStatusCodes with id " + req.params.orderItemsStatusCodesId
        });
    });
};

