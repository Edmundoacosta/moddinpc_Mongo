const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subcategory = new Schema({
	name: {type: String, required: true, trim: true},
	reference: {
		parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
	}
});

module.exports = mongoose.model('Subcategory', Subcategory);