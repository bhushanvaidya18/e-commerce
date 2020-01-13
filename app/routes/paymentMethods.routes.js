module.exports = (app) => {
    const paymentMethods = require('../controllers/paymentMethods.controller.js');

    // Create a new paymentMethods
    app.post('/paymentMethods', paymentMethods.create);

    // Retrieve all paymentMethods
    app.get('/paymentMethods', paymentMethods.findAll);

    // Retrieve a single paymentMethods with paymentMethodsId
    app.get('/paymentMethods/:paymentMethodsId', paymentMethods.findOne);

    // Update a paymentMethods with paymentMethodsId
    app.put('/paymentMethods/:paymentMethodsId', paymentMethods.update);

    // Delete a paymentMethods with paymentMethodsId
    app.delete('/paymentMethods/:paymentMethodsId', paymentMethods.delete);
}
