const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../lib/constants');

const ProductSchema = new Schema({
	name: {type: String, required: true, trim: true},
	color: {type: String},
	description: {type: String},
	principalImg: {type: String, default: ''},
	mainPdf: {type: String, default: ''},
	images: [
		{ type: String}
	],
	price: {type: Number},
	discount: {type: Number},
	inStock: {type: Number},
	subcategory: {type: String}
});

module.exports = mongoose.model('Product', ProductSchema);