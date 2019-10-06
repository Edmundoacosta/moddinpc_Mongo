const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../lib/constants');

const AddressesSchema = new Schema({
	name: {type: String, required: true, trim: true},
	postalCode: { type: Number },
	department: { type: String, required: true, enum: constants.DEPARTMENTS },
	district: {type: String, required: true, enum: constants.DISTRICTS },
	country: { type: String, default: 'Perú'},
	reference: {
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	}
});

module.exports = mongoose.model('Addresses', AddressesSchema);