const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const indexRoutes = require('./routes/index');
const users = require('./routes/users');
const cors = require('cors');
const constants = require('../lib/constants');
require('./config/passport');


//connecting to DB
mongoose.Promise = global.Promise;
mongoose.connect(constants.MONGO_PATH)
	.then(() => console.log('db is connected'))
		.catch(err => console.log(err));

// importing routes

// settings
app.set('port', process.env.PORT || constants.PORT);
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoutes);
app.use('/users', users);


app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'));
});

module.exports = app;