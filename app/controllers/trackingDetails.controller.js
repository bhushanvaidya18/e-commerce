const TrackingDetails = require('../models/trackingDetails.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const trackingDetails = new TrackingDetails(req.body);
    trackingDetails.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the trackingDetails."
        });
    });
};

exports.findAll = (req, res) => {
    TrackingDetails.find()
    .then(trackingDetails => {
        res.send(trackingDetails);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving trackingDetailss."
        });
    });
};

exports.findOne = (req, res) => {
    TrackingDetails.findById(req.params.trackingDetailsId)
    .then(trackingDetails => {
        if(!trackingDetails) {
            return res.status(404).send({
                message: "trackingDetails not found with id " + req.params.trackingDetailsId
            });            
        }
        res.send(trackingDetails);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "trackingDetails not found with id " + req.params.trackingDetailsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving trackingDetails with id " + req.params.trackingDetailsId
        });
    });
};

exports.update = (req, res) => {
    TrackingDetails.findByIdAndUpdate(req.params.trackingDetailsId, req.body, {new: true})
    .then(trackingDetails => {
        if(!trackingDetails) {
            return res.status(404).send({
                message: "trackingDetails not found with id " + req.params.trackingDetailsId
            });
        }
        res.send(trackingDetails);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "trackingDetails not found with id " + req.params.trackingDetailsId
            });                
        }
        return res.status(500).send({
            message: "Error updating trackingDetails with id " + req.params.trackingDetailsId
        });
    });
};

exports.delete = (req, res) => {
    TrackingDetails.findByIdAndRemove(req.params.trackingDetailsId)
    .then(trackingDetails => {
        if(!trackingDetails) {
            return res.status(404).send({
                message: "trackingDetails not found with id " + req.params.trackingDetailsId
            });
        }
        res.send({message: "trackingDetails deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "trackingDetails not found with id " + req.params.trackingDetailsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete trackingDetails with id " + req.params.trackingDetailsId
        });
    });
};

