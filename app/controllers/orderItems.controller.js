const OrderItems = require('../models/orderItems.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const orderItems = new OrderItems(req.body);
    orderItems.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the orderItems."
        });
    });
};

exports.findAll = (req, res) => {
    OrderItems.find()
    .then(orderItemss => {
        res.send(orderItemss);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orderItemss."
        });
    });
};

exports.findOne = (req, res) => {
    OrderItems.findById(req.params.orderItemsId)
    .then(orderItems => {
        if(!orderItems) {
            return res.status(404).send({
                message: "orderItems not found with id " + req.params.orderItemsId
            });            
        }
        res.send(orderItems);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "orderItems not found with id " + req.params.orderItemsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving orderItems with id " + req.params.orderItemsId
        });
    });
};

exports.update = (req, res) => {
    OrderItems.findByIdAndUpdate(req.params.orderItemsId, req.body, {new: true})
    .then(orderItems => {
        if(!orderItems) {
            return res.status(404).send({
                message: "orderItems not found with id " + req.params.orderItemsId
            });
        }
        res.send(orderItems);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "orderItems not found with id " + req.params.orderItemsId
            });                
        }
        return res.status(500).send({
            message: "Error updating orderItems with id " + req.params.orderItemsId
        });
    });
};

exports.delete = (req, res) => {
    OrderItems.findByIdAndRemove(req.params.orderItemsId)
    .then(orderItems => {
        if(!orderItems) {
            return res.status(404).send({
                message: "orderItems not found with id " + req.params.orderItemsId
            });
        }
        res.send({message: "orderItems deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "orderItems not found with id " + req.params.orderItemsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete orderItems with id " + req.params.orderItemsId
        });
    });
};

