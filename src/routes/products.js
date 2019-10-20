const express = require('express');
const router = express.Router();
const auth = require('./auth');
const Product = require('../models/product');
const mongoose = require('mongoose');
const fs = require('fs');

router.post("/add", async (req, res, next) => {
	var prod = new Product(req.body);
    prod.principalImg.data = fs.readFileSync(req.body.principalImg);
    prod.principalImg.contentType = 'image/png';
    

	prod.save().then(function(){
		return res.json({prod: prod.toAuthJSON()});
	}).catch(next);
});

router.get('/all', async (req, res) => {
    var prod = await Product.find({})
        .then(function(user) {
            return res.send({
                status: 200,
                message: 'OK',
                result: prod
            });
        })
});

router.put('/update', auth.required, function(req,res,next){
    Product.findById(req.params.id).then(function(prod){
        if(!prod){return res.sendStatus(401);}
        if(typeof req.body.prod.name !== 'undefined'){
            prod.setPassword(req.body.prod.name);
        }
        if(typeof req.body.prod.color !== 'undefined'){
            prod.setPassword(req.body.prod.color);
        }
        if(typeof req.body.prod.description !== 'undefined'){
            prod.setPassword(req.body.prod.description);
        }
        if(typeof req.body.prod.image !== 'undefined'){
            prod.setPassword(req.body.prod.image);
        }
        if(typeof req.body.prod.price !== 'undefined'){
            prod.setPassword(req.body.prod.price);
        }
        if(typeof req.body.prod.inStock !== 'undefined'){
            prod.setPassword(req.body.prod.inStock);
        }
        if(typeof req.body.prod.subcategory !== 'undefined'){
            prod.setPassword(req.body.prod.subcategory);
        }
        return prod.save().then(function(){
            return res.json({prod: prod.toAuthJSON()});
        });
    }).catch(next);
});

module.exports = router;