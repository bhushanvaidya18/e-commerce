const Shipments = require('../models/shipments.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const shipments = new Shipments(req.body);
    shipments.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the shipments."
        });
    });
};

exports.findAll = (req, res) => {
    Shipments.find()
    .then(shipmentss => {
        res.send(shipmentss);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving shipmentss."
        });
    });
};

exports.findOne = (req, res) => {
    Shipments.findById(req.params.shipmentsId)
    .then(shipments => {
        if(!shipments) {
            return res.status(404).send({
                message: "shipments not found with id " + req.params.shipmentsId
            });            
        }
        res.send(shipments);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "shipments not found with id " + req.params.shipmentsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving shipments with id " + req.params.shipmentsId
        });
    });
};

exports.update = (req, res) => {
    Shipments.findByIdAndUpdate(req.params.shipmentsId, req.body, {new: true})
    .then(shipments => {
        if(!shipments) {
            return res.status(404).send({
                message: "shipments not found with id " + req.params.shipmentsId
            });
        }
        res.send(shipments);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "shipments not found with id " + req.params.shipmentsId
            });                
        }
        return res.status(500).send({
            message: "Error updating shipments with id " + req.params.shipmentsId
        });
    });
};

exports.delete = (req, res) => {
    Shipments.findByIdAndRemove(req.params.shipmentsId)
    .then(shipments => {
        if(!shipments) {
            return res.status(404).send({
                message: "shipments not found with id " + req.params.shipmentsId
            });
        }
        res.send({message: "shipments deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "shipments not found with id " + req.params.shipmentsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete shipments with id " + req.params.shipmentsId
        });
    });
};

