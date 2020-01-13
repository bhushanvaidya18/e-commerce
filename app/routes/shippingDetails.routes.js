module.exports = (app) => {
    const shippingDetails = require('../controllers/shippingDetails.controller.js');

    // Create a new shippingDetails
    app.post('/shippingDetails', shippingDetails.create);

    // Retrieve all shippingDetails
    app.get('/shippingDetails', shippingDetails.findAll);

    // Retrieve a single shippingDetails with shippingDetailsId
    app.get('/shippingDetails/:shippingDetailsId', shippingDetails.findOne);

    // Update a shippingDetails with shippingDetailsId
    app.put('/shippingDetails/:shippingDetailsId', shippingDetails.update);

    // Delete a shippingDetails with shippingDetailsId
    app.delete('/shippingDetails/:shippingDetailsId', shippingDetails.delete);
}
