const Cart = require('../models/cart.model.js');

exports.create = (req, res) => {
    
    const cart = new Cart({customer: res.locals.user});
    cart.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the cart."
        });
    });
};

exports.findAll = (req, res) => {
    Cart.find({customer: res.locals.user})
    .then(carts => {
        res.send(carts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving carts."
        });
    });
};

exports.findOne = (req, res) => {
    Cart.findById(req.params.cartId)
    .then(cart => {
        if(!cart) {
            return res.status(404).send({
                message: "cart not found with id " + req.params.cartId
            });            
        }
        res.send(cart);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "cart not found with id " + req.params.cartId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving cart with id " + req.params.cartId
        });
    });
};

exports.update = (req, res) => {
    Cart.findByIdAndUpdate(req.params.cartId, req.body, {new: true})
    .then(cart => {
        if(!cart) {
            return res.status(404).send({
                message: "cart not found with id " + req.params.cartId
            });
        }
        res.send(cart);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "cart not found with id " + req.params.cartId
            });                
        }
        return res.status(500).send({
            message: "Error updating cart with id " + req.params.cartId
        });
    });
};

exports.delete = (req, res) => {
    Cart.findByIdAndRemove(req.params.cartId)
    .then(cart => {
        if(!cart) {
            return res.status(404).send({
                message: "cart not found with id " + req.params.cartId
            });
        }
        res.send({message: "cart deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "cart not found with id " + req.params.cartId
            });                
        }
        return res.status(500).send({
            message: "Could not delete cart with id " + req.params.cartId
        });
    });
};

