const Seller = require('../models/seller.model.js');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    Seller.findOne({email:req.body.email}, function(err, userInfo) {
        if (err) {
            next(err);
        } else {
            if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                const token = jwt.sign({user: userInfo}, req.app.get('sellerSecretKey'), { expiresIn: '1h' });
                res.json({status:"success", message: "Seller found!!!", data:{user: userInfo, token:token}});
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
        jwt.verify(token, req.app.get('sellerSecretKey'), function(err, decoded) {
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
    const seller = new Seller(req.body);
    seller.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the seller."
        });
    });
};

exports.findAll = (req, res) => {
    Seller.find()
    .then(sellers => {
        res.send(sellers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving sellers."
        });
    });
};

exports.findOne = (req, res) => {
    Seller.findById(req.params.sellerId)
    .then(seller => {
        if(!seller) {
            return res.status(404).send({
                message: "seller not found with id " + req.params.sellerId
            });            
        }
        res.send(seller);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "seller not found with id " + req.params.sellerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving seller with id " + req.params.sellerId
        });
    });
};

exports.findByEmail = (req, res) => {
    Seller.find({ 'email': req.body.email })
    .then(seller => {
        if(!seller) {
            return res.status(404).send({
                message: "seller not found with id " + req.params.sellerId
            });            
        }
        res.send(seller);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "seller not found with id " + req.params.sellerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving seller with id " + req.params.sellerId
        });
    });
};

exports.update = (req, res) => {
    Seller.findByIdAndUpdate(req.params.sellerId, req.body, {new: true})
    .then(seller => {
        if(!seller) {
            return res.status(404).send({
                message: "seller not found with id " + req.params.sellerId
            });
        }
        res.send(seller);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "seller not found with id " + req.params.sellerId
            });                
        }
        return res.status(500).send({
            message: "Error updating seller with id " + req.params.sellerId
        });
    });
};

exports.delete = (req, res) => {
    Seller.findByIdAndRemove(req.params.sellerId)
    .then(seller => {
        if(!seller) {
            return res.status(404).send({
                message: "seller not found with id " + req.params.sellerId
            });
        }
        res.send({message: "seller deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "seller not found with id " + req.params.sellerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete seller with id " + req.params.sellerId
        });
    });
};

