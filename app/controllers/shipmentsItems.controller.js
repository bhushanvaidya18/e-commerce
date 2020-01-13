const ShipmentsItems = require('../models/shipmentsItems.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const shipmentsItems = new ShipmentsItems(req.body);
    shipmentsItems.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the shipmentsItems."
        });
    });
};

exports.findAll = (req, res) => {
    ShipmentsItems.find()
    .then(shipmentsItemss => {
        res.send(shipmentsItemss);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving shipmentsItemss."
        });
    });
};

exports.findOne = (req, res) => {
    ShipmentsItems.findById(req.params.shipmentsItemsId)
    .then(shipmentsItems => {
        if(!shipmentsItems) {
            return res.status(404).send({
                message: "shipmentsItems not found with id " + req.params.shipmentsItemsId
            });            
        }
        res.send(shipmentsItems);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "shipmentsItems not found with id " + req.params.shipmentsItemsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving shipmentsItems with id " + req.params.shipmentsItemsId
        });
    });
};

exports.update = (req, res) => {
    ShipmentsItems.findByIdAndUpdate(req.params.shipmentsItemsId, req.body, {new: true})
    .then(shipmentsItems => {
        if(!shipmentsItems) {
            return res.status(404).send({
                message: "shipmentsItems not found with id " + req.params.shipmentsItemsId
            });
        }
        res.send(shipmentsItems);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "shipmentsItems not found with id " + req.params.shipmentsItemsId
            });                
        }
        return res.status(500).send({
            message: "Error updating shipmentsItems with id " + req.params.shipmentsItemsId
        });
    });
};

exports.delete = (req, res) => {
    ShipmentsItems.findByIdAndRemove(req.params.shipmentsItemsId)
    .then(shipmentsItems => {
        if(!shipmentsItems) {
            return res.status(404).send({
                message: "shipmentsItems not found with id " + req.params.shipmentsItemsId
            });
        }
        res.send({message: "shipmentsItems deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "shipmentsItems not found with id " + req.params.shipmentsItemsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete shipmentsItems with id " + req.params.shipmentsItemsId
        });
    });
};

