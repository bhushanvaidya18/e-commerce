module.exports = (app) => {
    const customer = require('../controllers/customer.controller.js');
    const admin = require('../controllers/admin.controller.js');

    // Create a new customer
    app.post('/customer',  admin.validate, customer.create);

    // Retrieve all customer
    app.get('/customer',  admin.validate, customer.findAll);

    // Retrieve a single customer with customerId
    app.get('/customer/:customerId',  admin.validate, customer.findOne);

    // Update a customer with customerId
    app.put('/customer/:customerId',  admin.validate, customer.update);

    // Delete a customer with customerId
    app.delete('/customer/:customerId',  admin.validate, customer.delete);

    // Customer login
    app.post('/customer/login', customer.login);
}
