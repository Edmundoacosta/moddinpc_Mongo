const express = require('express');
const router = express.Router();
const auth = require('./auth');
const Address = require('../models/addresses');
const User = require('../models/user');
const mongoose = require('mongoose');

router.post('/', auth.required, function(req,res,next){
	let result = {};
    Address.create(req.body)
    	.then((address) => {
    		result = address;
    		return User.findByIdAndUpdate(req.payload.id, { $push: {addresses: address._id}});
    	}).then(function(user){
    		res.send({
    			status: 201,
    			result: result
    		})
    	})
});

module.exports = router;