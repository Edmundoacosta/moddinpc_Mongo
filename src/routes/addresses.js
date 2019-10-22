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

router.put('/address', auth.required, function(req,res,next){
    Address.findById(req.params.id).then(function(address){
        if(!address){return res.sendStatus(401);}
        if(typeof req.body.address.name !== 'undefined'){
            address.name = req.body.address.name;
        }
        if(typeof req.body.address.district !== 'undefined'){
            address.district = req.body.address.district;
        }
        if(typeof req.body.address.postalCode !== 'undefined'){
            address.postalCode = req.body.address.postalCode;
        }
        return address.save().then(function(){
            return res.json({address: address.toAuthJSON()});
        });
    }).catch(next);
});

module.exports = router;