const Admin = require('../models/admin.model.js');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    Admin.findOne({email:req.body.email}, function(err, userInfo) {
        if (err) {
            next(err);
        } else {
            if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                const token = jwt.sign({user: userInfo}, req.app.get('adminSecretKey'), { expiresIn: '1h' });
                res.json({status:"success", message: "Admin found!!!", data:{user: userInfo, token:token}});
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
        jwt.verify(token, req.app.get('adminSecretKey'), function(err, decoded) {
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
    const admin = new Admin(req.body);
    admin.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the admin."
        });
    });
};

exports.findAll = (req, res) => {
    Admin.find()
    .then(admins => {
        res.send(admins);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving admins."
        });
    });
};

exports.findOne = (req, res) => {
    Admin.findById(req.params.adminId)
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.adminId
            });            
        }
        res.send(admin);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.adminId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin with id " + req.params.adminId
        });
    });
};

exports.update = (req, res) => {
    Admin.findByIdAndUpdate(req.params.adminId, req.body, {new: true})
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.adminId
            });
        }
        res.send(admin);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.adminId
            });                
        }
        return res.status(500).send({
            message: "Error updating admin with id " + req.params.adminId
        });
    });
};

exports.delete = (req, res) => {
    Admin.findByIdAndRemove(req.params.adminId)
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.adminId
            });
        }
        res.send({message: "admin deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.adminId
            });                
        }
        return res.status(500).send({
            message: "Could not delete admin with id " + req.params.adminId
        });
    });
};

