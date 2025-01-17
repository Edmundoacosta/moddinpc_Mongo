const jwt = require('express-jwt');
const secret = require('../config').secret;

function getTokenFromHeaders(req) {
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
		return req.headers.authorization.split(' ')[1];
	}
	return null;
}


var auth = {
	required: jwt({
		secret: 'secret',
		userProperty: 'payload',
		getToken: getTokenFromHeaders
	}),
	optional: jwt({
		secret: 'secret',
		userProperty: 'payload',
		credentialsRequired: false,
		getToken: getTokenFromHeaders
	})
};

module.exports = auth;