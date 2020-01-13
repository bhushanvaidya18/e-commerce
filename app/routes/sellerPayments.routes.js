module.exports = (app) => {
    const sellerPayments = require('../controllers/sellerPayments.controller.js');

    // Create a new sellerPayments
    app.post('/sellerPayments', sellerPayments.create);

    // Retrieve all sellerPayments
    app.get('/sellerPayments', sellerPayments.findAll);

    // Retrieve a single sellerPayments with sellerPaymentsId
    app.get('/sellerPayments/:sellerPaymentsId', sellerPayments.findOne);

    // Update a sellerPayments with sellerPaymentsId
    app.put('/sellerPayments/:sellerPaymentsId', sellerPayments.update);

    // Delete a sellerPayments with sellerPaymentsId
    app.delete('/sellerPayments/:sellerPaymentsId', sellerPayments.delete);
}
