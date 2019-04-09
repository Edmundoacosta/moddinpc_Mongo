const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {type: String},
	lastname: {type: String},
	password: {type: String},
	email: {type: String, lowercase: true},
	dob: { type: Date, default: new Date() },
	address: {type: String},
	zipCode: Number,
	admin: {type: Boolean,default: false},
	status: Boolean
});

module.exports = mongoose.model('User',UserSchema);