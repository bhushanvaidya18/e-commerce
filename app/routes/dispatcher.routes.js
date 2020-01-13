module.exports = (app) => {
    const dispatcher = require('../controllers/dispatcher.controller.js');
    const admin = require('../controllers/admin.controller.js');

    // Create a new dispatcher
    app.post('/dispatcher',  admin.validate, dispatcher.create);

    // Retrieve all dispatcher
    app.get('/dispatcher',  admin.validate, dispatcher.findAll);

    // Retrieve a single dispatcher with dispatcherId
    app.get('/dispatcher/:dispatcherId',  admin.validate, dispatcher.findOne);

    // Update a dispatcher with dispatcherId
    app.put('/dispatcher/:dispatcherId',  admin.validate, dispatcher.update);

    // Delete a dispatcher with dispatcherId
    app.delete('/dispatcher/:dispatcherId',  admin.validate, dispatcher.delete);

    // Dispatcher login
    app.post('/dispatcher/login', dispatcher.login);
}
