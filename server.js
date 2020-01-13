const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
// Currently it is only one secret. We can have different secrets for different users.
app.set('secretKey', 'tomtomAssignment');
app.set('adminSecretKey', 'd7699180c0ea08a7904b');
app.set('customerSecretKey', '4a9ab081291c1628afb7');
app.set('sellerSecretKey', '2c611a1391638a520051');
app.set('dispatcherSecretKey', '74951160dd139b96482f');

app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to TomTom Assignment!"});
});

require('./app/routes/admin.routes.js')(app);
require('./app/routes/productTypes.routes.js')(app);
require('./app/routes/payments.routes.js')(app);
require('./app/routes/cart.routes.js')(app);
require('./app/routes/cartItemsStatusCodes.routes.js')(app);
require('./app/routes/shippingDetails.routes.js')(app);
require('./app/routes/order.routes.js')(app);
require('./app/routes/trackingDetails.routes.js')(app);
require('./app/routes/dispatcher.routes.js')(app);
require('./app/routes/sellerPayments.routes.js')(app);
require('./app/routes/customer.routes.js')(app);
require('./app/routes/seller.routes.js')(app);
require('./app/routes/address.routes.js')(app);
require('./app/routes/shipmentsItems.routes.js')(app);
require('./app/routes/product.routes.js')(app);
require('./app/routes/orderItemsStatusCodes.routes.js')(app);
require('./app/routes/orderItems.routes.js')(app);
require('./app/routes/billingDetails.routes.js')(app);
require('./app/routes/orderStatusCodes.routes.js')(app);
require('./app/routes/shipments.routes.js')(app);
require('./app/routes/cartItems.routes.js')(app);
require('./app/routes/invoicesStatusCodes.routes.js')(app);
require('./app/routes/invoices.routes.js')(app);


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
