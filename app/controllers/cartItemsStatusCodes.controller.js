const CartItemsStatusCodes = require('../models/cartItemsStatusCodes.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const cartItemsStatusCodes = new CartItemsStatusCodes(req.body);
    cartItemsStatusCodes.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the cartItemsStatusCodes."
        });
    });
};

exports.findAll = (req, res) => {
    CartItemsStatusCodes.find()
    .then(cartItemsStatusCodess => {
        res.send(cartItemsStatusCodess);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving cartItemsStatusCodess."
        });
    });
};

exports.findOne = (req, res) => {
    CartItemsStatusCodes.findById(req.params.cartItemsStatusCodesId)
    .then(cartItemsStatusCodes => {
        if(!cartItemsStatusCodes) {
            return res.status(404).send({
                message: "cartItemsStatusCodes not found with id " + req.params.cartItemsStatusCodesId
            });            
        }
        res.send(cartItemsStatusCodes);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "cartItemsStatusCodes not found with id " + req.params.cartItemsStatusCodesId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving cartItemsStatusCodes with id " + req.params.cartItemsStatusCodesId
        });
    });
};

exports.update = (req, res) => {
    CartItemsStatusCodes.findByIdAndUpdate(req.params.cartItemsStatusCodesId, req.body, {new: true})
    .then(cartItemsStatusCodes => {
        if(!cartItemsStatusCodes) {
            return res.status(404).send({
                message: "cartItemsStatusCodes not found with id " + req.params.cartItemsStatusCodesId
            });
        }
        res.send(cartItemsStatusCodes);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "cartItemsStatusCodes not found with id " + req.params.cartItemsStatusCodesId
            });                
        }
        return res.status(500).send({
            message: "Error updating cartItemsStatusCodes with id " + req.params.cartItemsStatusCodesId
        });
    });
};

exports.delete = (req, res) => {
    CartItemsStatusCodes.findByIdAndRemove(req.params.cartItemsStatusCodesId)
    .then(cartItemsStatusCodes => {
        if(!cartItemsStatusCodes) {
            return res.status(404).send({
                message: "cartItemsStatusCodes not found with id " + req.params.cartItemsStatusCodesId
            });
        }
        res.send({message: "cartItemsStatusCodes deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "cartItemsStatusCodes not found with id " + req.params.cartItemsStatusCodesId
            });                
        }
        return res.status(500).send({
            message: "Could not delete cartItemsStatusCodes with id " + req.params.cartItemsStatusCodesId
        });
    });
};

