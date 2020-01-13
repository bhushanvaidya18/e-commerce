module.exports = (app) => {
    const shipments = require('../controllers/shipments.controller.js');

    // Create a new shipments
    app.post('/shipments', shipments.create);

    // Retrieve all shipments
    app.get('/shipments', shipments.findAll);

    // Retrieve a single shipments with shipmentsId
    app.get('/shipments/:shipmentsId', shipments.findOne);

    // Update a shipments with shipmentsId
    app.put('/shipments/:shipmentsId', shipments.update);

    // Delete a shipments with shipmentsId
    app.delete('/shipments/:shipmentsId', shipments.delete);
}
