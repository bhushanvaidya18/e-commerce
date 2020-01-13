const ProductTypes = require('../models/productTypes.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const productTypes = new ProductTypes(req.body);
    productTypes.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the productTypes."
        });
    });
};

exports.findAll = (req, res) => {
    ProductTypes.find()
    .then(productTypess => {
        res.send(productTypess);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving productTypess."
        });
    });
};

exports.findOne = (req, res) => {
    ProductTypes.findById(req.params.productTypesId)
    .then(productTypes => {
        if(!productTypes) {
            return res.status(404).send({
                message: "productTypes not found with id " + req.params.productTypesId
            });            
        }
        res.send(productTypes);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "productTypes not found with id " + req.params.productTypesId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving productTypes with id " + req.params.productTypesId
        });
    });
};

exports.update = (req, res) => {
    ProductTypes.findByIdAndUpdate(req.params.productTypesId, req.body, {new: true})
    .then(productTypes => {
        if(!productTypes) {
            return res.status(404).send({
                message: "productTypes not found with id " + req.params.productTypesId
            });
        }
        res.send(productTypes);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "productTypes not found with id " + req.params.productTypesId
            });                
        }
        return res.status(500).send({
            message: "Error updating productTypes with id " + req.params.productTypesId
        });
    });
};

exports.delete = (req, res) => {
    ProductTypes.findByIdAndRemove(req.params.productTypesId)
    .then(productTypes => {
        if(!productTypes) {
            return res.status(404).send({
                message: "productTypes not found with id " + req.params.productTypesId
            });
        }
        res.send({message: "productTypes deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "productTypes not found with id " + req.params.productTypesId
            });                
        }
        return res.status(500).send({
            message: "Could not delete productTypes with id " + req.params.productTypesId
        });
    });
};

