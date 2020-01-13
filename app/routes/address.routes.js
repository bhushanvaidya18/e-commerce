module.exports = (app) => {
    const address = require('../controllers/address.controller.js');

    // Create a new address
    app.post('/address', address.create);

    // Retrieve all address
    app.get('/address', address.findAll);

    // Retrieve a single address with addressId
    app.get('/address/:addressId', address.findOne);

    // Update a address with addressId
    app.put('/address/:addressId', address.update);

    // Delete a address with addressId
    app.delete('/address/:addressId', address.delete);
}
