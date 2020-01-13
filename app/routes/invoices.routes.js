module.exports = (app) => {
    const invoices = require('../controllers/invoices.controller.js');

    // Create a new invoices
    app.post('/invoices', invoices.create);

    // Retrieve all invoices
    app.get('/invoices', invoices.findAll);

    // Retrieve a single invoices with invoicesId
    app.get('/invoices/:invoicesId', invoices.findOne);

    // Update a invoices with invoicesId
    app.put('/invoices/:invoicesId', invoices.update);

    // Delete a invoices with invoicesId
    app.delete('/invoices/:invoicesId', invoices.delete);
}
