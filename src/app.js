const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const indexRoutes = require('./routes/index');
const users = require('./routes/users');
const addresses = require('./routes/addresses');
const products = require('./routes/products');
const categories = require('./routes/categories');
const transactions = require('./routes/transactions');
const cors = require('cors');
const constants = require('../lib/constants');
const fileUpload = require("express-fileupload");
require('./config/passport');

//Importar vars
require('dotenv').config({path: 'variables.env'});

//connecting to DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL)
	.then(() => console.log('db is connected'))
		.catch(err => console.log(err));

// importing routes

// settings
app.set('port', process.env.PORT || constants.PORT);
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// middlewares
app.use(bodyParser.json({limit: '20mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));

app.use(fileUpload());

app.use('/', indexRoutes);
app.use('/users', users);
app.use('/address', addresses);
app.use('/products', products);
app.use('/category', categories);
app.use('/transactions', categories);
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static("public"));

app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'));
});


module.exports = app;