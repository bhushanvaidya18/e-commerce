const CartItems = require('../models/cartItems.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const cartItems = new CartItems(req.body);
    cartItems.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the cartItems."
        });
    });
};

exports.findAll = (req, res) => {
    CartItems.find()
    .then(cartItemss => {
        res.send(cartItemss);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving cartItemss."
        });
    });
};

exports.findOne = (req, res) => {
    CartItems.findById(req.params.cartItemsId)
    .then(cartItems => {
        if(!cartItems) {
            return res.status(404).send({
                message: "cartItems not found with id " + req.params.cartItemsId
            });            
        }
        res.send(cartItems);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "cartItems not found with id " + req.params.cartItemsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving cartItems with id " + req.params.cartItemsId
        });
    });
};

exports.update = (req, res) => {
    CartItems.findByIdAndUpdate(req.params.cartItemsId, req.body, {new: true})
    .then(cartItems => {
        if(!cartItems) {
            return res.status(404).send({
                message: "cartItems not found with id " + req.params.cartItemsId
            });
        }
        res.send(cartItems);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "cartItems not found with id " + req.params.cartItemsId
            });                
        }
        return res.status(500).send({
            message: "Error updating cartItems with id " + req.params.cartItemsId
        });
    });
};

exports.delete = (req, res) => {
    CartItems.findByIdAndRemove(req.params.cartItemsId)
    .then(cartItems => {
        if(!cartItems) {
            return res.status(404).send({
                message: "cartItems not found with id " + req.params.cartItemsId
            });
        }
        res.send({message: "cartItems deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "cartItems not found with id " + req.params.cartItemsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete cartItems with id " + req.params.cartItemsId
        });
    });
};

