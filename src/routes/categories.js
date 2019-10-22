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

router.put('/update', auth.required, function(req,res,next){
    Category.findById(req.body.id).then(function(category){
        if(!category){return res.sendStatus(401);}
        if(typeof req.body.name !== 'undefined'){
            category.name = req.body.name;
        }
        return category.save().then(function(){
            return res.json({category: category.toAuthJSON()});
        });
    }).catch(next);
});

router.delete('/delete/:id', auth.required, function(req,res,next){
    Subcategory.findOneAndRemove({ _id: req.params.id}).then(function(ans){
        res.send({
            status: 201,
            result: ans
        });
    });
});

module.exports = router;