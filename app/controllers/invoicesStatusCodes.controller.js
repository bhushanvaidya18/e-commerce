const InvoicesStatusCodes = require('../models/invoicesStatusCodes.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const invoicesStatusCodes = new InvoicesStatusCodes(req.body);
    invoicesStatusCodes.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the invoicesStatusCodes."
        });
    });
};

exports.findAll = (req, res) => {
    InvoicesStatusCodes.find()
    .then(invoicesStatusCodess => {
        res.send(invoicesStatusCodess);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving invoicesStatusCodess."
        });
    });
};

exports.findOne = (req, res) => {
    InvoicesStatusCodes.findById(req.params.invoicesStatusCodesId)
    .then(invoicesStatusCodes => {
        if(!invoicesStatusCodes) {
            return res.status(404).send({
                message: "invoicesStatusCodes not found with id " + req.params.invoicesStatusCodesId
            });            
        }
        res.send(invoicesStatusCodes);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "invoicesStatusCodes not found with id " + req.params.invoicesStatusCodesId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving invoicesStatusCodes with id " + req.params.invoicesStatusCodesId
        });
    });
};

exports.update = (req, res) => {
    InvoicesStatusCodes.findByIdAndUpdate(req.params.invoicesStatusCodesId, req.body, {new: true})
    .then(invoicesStatusCodes => {
        if(!invoicesStatusCodes) {
            return res.status(404).send({
                message: "invoicesStatusCodes not found with id " + req.params.invoicesStatusCodesId
            });
        }
        res.send(invoicesStatusCodes);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "invoicesStatusCodes not found with id " + req.params.invoicesStatusCodesId
            });                
        }
        return res.status(500).send({
            message: "Error updating invoicesStatusCodes with id " + req.params.invoicesStatusCodesId
        });
    });
};

exports.delete = (req, res) => {
    InvoicesStatusCodes.findByIdAndRemove(req.params.invoicesStatusCodesId)
    .then(invoicesStatusCodes => {
        if(!invoicesStatusCodes) {
            return res.status(404).send({
                message: "invoicesStatusCodes not found with id " + req.params.invoicesStatusCodesId
            });
        }
        res.send({message: "invoicesStatusCodes deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "invoicesStatusCodes not found with id " + req.params.invoicesStatusCodesId
            });                
        }
        return res.status(500).send({
            message: "Could not delete invoicesStatusCodes with id " + req.params.invoicesStatusCodesId
        });
    });
};

