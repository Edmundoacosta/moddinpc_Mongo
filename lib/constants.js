function define(name, value) {
	Object.defineProperty(exports, name, {
		value: value,
		enumerable: true
	});
}

define('PORT', 4444);
define('MONGO_PATH', 'mongodb://localhost/modPC-server');

define('ROLES', [
	'Admin',
	'User'
]);

define('CONFIRM', {
    200: 'OK', 
    201: 'Created',
    209: 'Updated',
    210: 'Deleted',
    211: 'Uploaded'
});

// Errors
define('ERROR', {
    403: 'Forbidden',
    470: 'BD Error',
    480: 'Missing parameters',
    481: 'User required',
    482: 'Password required',
    483: 'Incorrect password',
    
    491: 'Empty response',
    494: 'User doesn\'t exist',
    495: 'User already exist',

    499: 'Custom error'
});
