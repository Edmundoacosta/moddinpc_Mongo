const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
var secret = require('../config').secret;

const UserSchema = new Schema({
	firstname: {type: String},
	lastname: {type: String},
	rucname: {type: String},
	password: {type: String},
	id_type: {type: String, required: true},
	id_number: {type: String, unique: true, required: true},
	phone: {type: String, unique: true, required: true},
	email: {type: String, unique: true, required: [true, "cannot be empty."], lowercase: true, index: true},
	addresses: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "Addresses"}
	],
	transactions: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "Transactions"}
	],
	admin: {type: Boolean, default: false},
	country: {type: String, required: true, default: 'Perú'},
	department: {type: String, required: true},
	postalCode: {type: Number},
	verification: {type: String },
	salt: String,
	hash: String,
	status: Boolean
}, {timestamps: true});

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
		firstname: this.firstname,
		lastname: this.lastname,
		username: this.username,
		email: this.email,
		token: this.generateJWT()
	};
};

module.exports = mongoose.model('User',UserSchema);