module.exports = (app) => {
    const trackingDetails = require('../controllers/trackingDetails.controller.js');

    // Create a new trackingDetails
    app.post('/trackingDetails', trackingDetails.create);

    // Retrieve all trackingDetails
    app.get('/trackingDetails', trackingDetails.findAll);

    // Retrieve a single trackingDetails with trackingDetailsId
    app.get('/trackingDetails/:trackingDetailsId', trackingDetails.findOne);

    // Update a trackingDetails with trackingDetailsId
    app.put('/trackingDetails/:trackingDetailsId', trackingDetails.update);

    // Delete a trackingDetails with trackingDetailsId
    app.delete('/trackingDetails/:trackingDetailsId', trackingDetails.delete);
}
