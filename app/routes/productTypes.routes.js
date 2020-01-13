module.exports = (app) => {
    const productTypes = require('../controllers/productTypes.controller.js');
    const admin = require('../controllers/admin.controller.js');

    // Create a new productTypes
    app.post('/productTypes', admin.validate, productTypes.create);

    // Retrieve all productTypes
    app.get('/productTypes', admin.validate, productTypes.findAll);

    // Retrieve a single productTypes with productTypesId
    app.get('/productTypes/:productTypesId', admin.validate, productTypes.findOne);

    // Update a productTypes with productTypesId
    app.put('/productTypes/:productTypesId', admin.validate, productTypes.update);

    // Delete a productTypes with productTypesId
    app.delete('/productTypes/:productTypesId', admin.validate, productTypes.delete);
}
