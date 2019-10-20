const express = require('express');
const router = express.Router();
const auth = require('./auth');
const Category = require('../models/categories');
const Subcategory = require('../models/subcategories');
const mongoose = require('mongoose');


router.get('/all', async (req, res) => {
    var cat = await Category.find({})
        .populate('subcategories')
        .then(function(cat) {
            return res.send({
                status: 200,
                message: 'OK',
                result: cat
            });
        })
});

router.post('/create', auth.required, function(req,res,next){
    Category.create(req.body)
    	.then(function(category){
    		res.send({
    			status: 201,
    			result: category
    		})
    	})
});

router.post('/subcreate', auth.required, function(req,res,next){
    let result = {};
    Subcategory.create(req.body)
        .then(function(sub){
            result = sub;
            return Category.findByIdAndUpdate(req.body.parent, { $push: {subcategories: sub._id}});
        }).then(function(cate){
            res.send({
                status: 201,
                result: cate
            })
        });
});

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

router.put('/update', auth.required, function(req,res,next){
    Category.findById(req.payload.id).then(function(category){
        if(!category){return res.sendStatus(401);}
        if(typeof req.body.category.name !== 'undefined'){
            category.setPassword(req.body.category.name);
        }
        return category.save().then(function(){
            return res.json({category: category.toAuthJSON()});
        });
    }).catch(next);
});

module.exports = router;