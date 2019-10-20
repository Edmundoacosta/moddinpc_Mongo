const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../lib/constants');

const ProductSchema = new Schema({
	name: {type: String, required: true, trim: true},
	color: {type: String},
	description: {type: String},
	image: {type: String, trim: true},
	price: {type: Number},
	inStock: {type: Number},
	subcategory: {type: String}
	// reference: {
	// 	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	// }
});

module.exports = mongoose.model('Product', ProductSchema);