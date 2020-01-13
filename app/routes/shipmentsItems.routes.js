module.exports = (app) => {
    const shipmentsItems = require('../controllers/shipmentsItems.controller.js');

    // Create a new shipmentsItems
    app.post('/shipmentsItems', shipmentsItems.create);

    // Retrieve all shipmentsItems
    app.get('/shipmentsItems', shipmentsItems.findAll);

    // Retrieve a single shipmentsItems with shipmentsItemsId
    app.get('/shipmentsItems/:shipmentsItemsId', shipmentsItems.findOne);

    // Update a shipmentsItems with shipmentsItemsId
    app.put('/shipmentsItems/:shipmentsItemsId', shipmentsItems.update);

    // Delete a shipmentsItems with shipmentsItemsId
    app.delete('/shipmentsItems/:shipmentsItemsId', shipmentsItems.delete);
}
