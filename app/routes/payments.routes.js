module.exports = (app) => {
    const payments = require('../controllers/payments.controller.js');

    // Create a new payments
    app.post('/payments', payments.create);

    // Retrieve all payments
    app.get('/payments', payments.findAll);

    // Retrieve a single payments with paymentsId
    app.get('/payments/:paymentsId', payments.findOne);

    // Update a payments with paymentsId
    app.put('/payments/:paymentsId', payments.update);

    // Delete a payments with paymentsId
    app.delete('/payments/:paymentsId', payments.delete);
}
