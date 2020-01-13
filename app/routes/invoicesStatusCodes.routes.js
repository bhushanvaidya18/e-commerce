module.exports = (app) => {
    const invoicesStatusCodes = require('../controllers/invoicesStatusCodes.controller.js');

    // Create a new invoicesStatusCodes
    app.post('/invoicesStatusCodes', invoicesStatusCodes.create);

    // Retrieve all invoicesStatusCodes
    app.get('/invoicesStatusCodes', invoicesStatusCodes.findAll);

    // Retrieve a single invoicesStatusCodes with invoicesStatusCodesId
    app.get('/invoicesStatusCodes/:invoicesStatusCodesId', invoicesStatusCodes.findOne);

    // Update a invoicesStatusCodes with invoicesStatusCodesId
    app.put('/invoicesStatusCodes/:invoicesStatusCodesId', invoicesStatusCodes.update);

    // Delete a invoicesStatusCodes with invoicesStatusCodesId
    app.delete('/invoicesStatusCodes/:invoicesStatusCodesId', invoicesStatusCodes.delete);
}
