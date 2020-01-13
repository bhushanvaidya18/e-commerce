const Invoices = require('../models/invoices.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    const invoices = new Invoices(req.body);
    invoices.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the invoices."
        });
    });
};

exports.findAll = (req, res) => {
    Invoices.find()
    .then(invoicess => {
        res.send(invoicess);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving invoicess."
        });
    });
};

exports.findOne = (req, res) => {
    Invoices.findById(req.params.invoicesId)
    .then(invoices => {
        if(!invoices) {
            return res.status(404).send({
                message: "invoices not found with id " + req.params.invoicesId
            });            
        }
        res.send(invoices);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "invoices not found with id " + req.params.invoicesId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving invoices with id " + req.params.invoicesId
        });
    });
};

exports.update = (req, res) => {
    Invoices.findByIdAndUpdate(req.params.invoicesId, req.body, {new: true})
    .then(invoices => {
        if(!invoices) {
            return res.status(404).send({
                message: "invoices not found with id " + req.params.invoicesId
            });
        }
        res.send(invoices);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "invoices not found with id " + req.params.invoicesId
            });                
        }
        return res.status(500).send({
            message: "Error updating invoices with id " + req.params.invoicesId
        });
    });
};

exports.delete = (req, res) => {
    Invoices.findByIdAndRemove(req.params.invoicesId)
    .then(invoices => {
        if(!invoices) {
            return res.status(404).send({
                message: "invoices not found with id " + req.params.invoicesId
            });
        }
        res.send({message: "invoices deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "invoices not found with id " + req.params.invoicesId
            });                
        }
        return res.status(500).send({
            message: "Could not delete invoices with id " + req.params.invoicesId
        });
    });
};

