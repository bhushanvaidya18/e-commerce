module.exports = (app) => {
    const billingDetails = require('../controllers/billingDetails.controller.js');

    // Create a new billingDetails
    app.post('/billingDetails', billingDetails.create);

    // Retrieve all billingDetails
    app.get('/billingDetails', billingDetails.findAll);

    // Retrieve a single billingDetails with billingDetailsId
    app.get('/billingDetails/:billingDetailsId', billingDetails.findOne);

    // Update a billingDetails with billingDetailsId
    app.put('/billingDetails/:billingDetailsId', billingDetails.update);

    // Delete a billingDetails with billingDetailsId
    app.delete('/billingDetails/:billingDetailsId', billingDetails.delete);
}
