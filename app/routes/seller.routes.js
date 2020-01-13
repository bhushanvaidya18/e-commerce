module.exports = (app) => {
    const seller = require('../controllers/seller.controller.js');
    const admin = require('../controllers/admin.controller.js');

    // Create a new seller
    app.post('/seller',  admin.validate, seller.create);

    // Retrieve all seller
    app.get('/seller',  admin.validate, seller.findAll);

    // Retrieve a single seller with sellerId
    app.get('/seller/:sellerId',  admin.validate, seller.findOne);

    // Update a seller with sellerId
    app.put('/seller/:sellerId',  admin.validate, seller.update);

    // Delete a seller with sellerId
    app.delete('/seller/:sellerId',  admin.validate, seller.delete);

    // Seller login
    app.post('/seller/login', seller.login);
}
