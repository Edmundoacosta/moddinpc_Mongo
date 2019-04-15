const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
var secret = require('../config').secret;
const UserSchema = new Schema({
	name: {type: String},
	lastname: {type: String},
	password: {type: String},
	email: {type: String, lowercase: true, unique: true},
	dob: { type: Date, default: new Date() },
	address: {type: String},
	zipCode: Number,
	admin: {type: Boolean,default: false},
	salt: String,
	hash: String,
	status: Boolean
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken'});

UserSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash === hash;
}

UserSchema.methods.generateJWT = function(){
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate()+60);

	return jwt.sign({
		id: this._id,
		email: this.email,
		exp: parseInt(exp.getTime()/1000)
	}, secret);
}

UserSchema.methods.toAuthJSON = function(){
    return {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        token: this.generateJWT()
    };
};

module.exports = mongoose.model('User',UserSchema);