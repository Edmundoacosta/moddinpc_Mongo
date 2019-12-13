const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../lib/constants');

const TransactionsSchema = new Schema({
	products: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "Product"}
	],
	addresses: {
		name: {type: String, trim: true},
		postalCode: { type: Number },
		department: { type: String, required: true, enum: constants.DEPARTMENTS },
		district: {type: String, required: true, enum: constants.DISTRICTS },
		country: { type: String, default: 'Perú'}
	},
	status: { type: String, enum: constants.STATES},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	deliveryprice: { type: Number},
	paymentMethod: { type: String},
	ticket: { type: String},
	reference: {
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	}

});

module.exports = mongoose.model('Transactions', TransactionsSchema);