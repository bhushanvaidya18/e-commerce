const Dispatcher = require('../models/dispatcher.model.js');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    Dispatcher.findOne({email:req.body.email}, function(err, userInfo) {
        if (err) {
            next(err);
        } else {
            if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                const token = jwt.sign({user: userInfo}, req.app.get('dispatcherSecretKey'), { expiresIn: '1h' });
                res.json({status:"success", message: "Dispatcher found!!!", data:{user: userInfo, token:token}});
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
        jwt.verify(token, req.app.get('dispatcherSecretKey'), function(err, decoded) {
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
    const dispatcher = new Dispatcher(req.body);
    dispatcher.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the dispatcher."
        });
    });
};

exports.findAll = (req, res) => {
    Dispatcher.find()
    .then(dispatcher => {
        res.send(dispatcher);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving dispatchers."
        });
    });
};

exports.findOne = (req, res) => {
    Dispatcher.findById(req.params.dispatcherId)
    .then(dispatcher => {
        if(!dispatcher) {
            return res.status(404).send({
                message: "dispatcher not found with id " + req.params.dispatcherId
            });            
        }
        res.send(dispatcher);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "dispatcher not found with id " + req.params.dispatcherId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving dispatcher with id " + req.params.dispatcherId
        });
    });
};

exports.update = (req, res) => {
    Dispatcher.findByIdAndUpdate(req.params.dispatcherId, req.body, {new: true})
    .then(dispatcher => {
        if(!dispatcher) {
            return res.status(404).send({
                message: "dispatcher not found with id " + req.params.dispatcherId
            });
        }
        res.send(dispatcher);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "dispatcher not found with id " + req.params.dispatcherId
            });                
        }
        return res.status(500).send({
            message: "Error updating dispatcher with id " + req.params.dispatcherId
        });
    });
};

exports.delete = (req, res) => {
    Dispatcher.findByIdAndRemove(req.params.dispatcherId)
    .then(dispatcher => {
        if(!dispatcher) {
            return res.status(404).send({
                message: "dispatcher not found with id " + req.params.dispatcherId
            });
        }
        res.send({message: "dispatcher deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "dispatcher not found with id " + req.params.dispatcherId
            });                
        }
        return res.status(500).send({
            message: "Could not delete dispatcher with id " + req.params.dispatcherId
        });
    });
};

