module.exports = (app) => {
    const orderStatusCodes = require('../controllers/orderStatusCodes.controller.js');

    // Create a new orderStatusCodes
    app.post('/orderStatusCodes', orderStatusCodes.create);

    // Retrieve all orderStatusCodes
    app.get('/orderStatusCodes', orderStatusCodes.findAll);

    // Retrieve a single orderStatusCodes with orderStatusCodesId
    app.get('/orderStatusCodes/:orderStatusCodesId', orderStatusCodes.findOne);

    // Update a orderStatusCodes with orderStatusCodesId
    app.put('/orderStatusCodes/:orderStatusCodesId', orderStatusCodes.update);

    // Delete a orderStatusCodes with orderStatusCodesId
    app.delete('/orderStatusCodes/:orderStatusCodesId', orderStatusCodes.delete);
}
