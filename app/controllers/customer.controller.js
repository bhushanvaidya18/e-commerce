const Customer = require('../models/customer.model.js');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    Customer.findOne({email:req.body.email}, function(err, userInfo) {
        if (err) {
            next(err);
        } else {
            if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                const token = jwt.sign({user: userInfo}, req.app.get('customerSecretKey'), { expiresIn: '1h' });
                res.json({status:"success", message: "Customer found!!!", data:{user: userInfo, token:token}});
            }else{
                res.json({status:"error", message: "Invalid email/password!!!", data:null});
            }
        }
    });
}

exports.validate = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, req.app.get('customerSecretKey'), function(err, decoded) {
            if (err) {
                res.status(401).send({status:"error", message: "Unauthorised access!"});
            }
            else {
                res.locals.user = decoded.user;  
                next();
            }
        });
    } else {
        res.status(401).send({status:"error", message: "Unauthorised access!"});
    }
}

exports.create = (req, res) => {
    console.log(req.body);
    const customer = new Customer(req.body);
    customer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the customer."
        });
    });
};

exports.findAll = (req, res) => {
    Customer.find()
    .then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving customers."
        });
    });
};

exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });            
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving customer with id " + req.params.customerId
        });
    });
};

exports.update = (req, res) => {
    Customer.findByIdAndUpdate(req.params.customerId, req.body, {new: true})
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.customerId
        });
    });
};

exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });
        }
        res.send({message: "customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete customer with id " + req.params.customerId
        });
    });
};

