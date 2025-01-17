const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	name: {type: String, required: true, trim: true, unique: true},
	subcategories: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "Subcategory"}
	]
});

module.exports = mongoose.model('Category', CategorySchema);