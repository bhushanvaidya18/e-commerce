module.exports = (app) => {
    const admin = require('../controllers/admin.controller.js');

    // Create a new admin
    app.post('/admin', admin.validate, admin.create);

    // Retrieve all admin
    app.get('/admin', admin.validate, admin.findAll);

    // Retrieve a single admin with adminId
    app.get('/admin/:adminId',  admin.validate, admin.findOne);

    // Update a admin with adminId
    app.put('/admin/:adminId',  admin.validate, admin.update);

    // Delete a admin with adminId
    app.delete('/admin/:adminId',  admin.validate, admin.delete);

    // Admin login
    app.post('/admin/login', admin.login);
}
