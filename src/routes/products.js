const express = require('express');
const router = express.Router();
const auth = require('./auth');
const Product = require('../models/product');
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload");
var fs = require('fs');
const DIR = './src/public/products/';

router.post("/add", auth.required, async (req, res, next) => {
	if(!req.body.principalImg){
        return res.send({
            status: 401,
            message: null,
            result: 'Falta agregar una imagen a esta empresa',
        });
    }

    let companyName = req.body.name.toLowerCase().split(' ').join('_');
    companyName = companyName.replace(/#|&|%|,|¡|!/gi, '-');
    companyName = companyName.replace(/á/gi, 'a');
    companyName = companyName.replace(/é/gi, 'e');
    companyName = companyName.replace(/í/gi, 'i');
    companyName = companyName.replace(/ó/gi, 'o');
    companyName = companyName.replace(/ú|ü/gi, 'u');
    companyName = companyName.replace(/ñ/gi, 'ni');
    let filename = companyName + '.png';
    fs.writeFile(DIR + filename, req.body.principalImg, 'base64', async function(err) {
        if(err) console.log(err);
        req.body.principalImg = filename;
        let product = await Product.create(req.body);
        return res.send({
            status: 201,
            message: 'OK',
            result: product
        });
    });
});

router.get('/all', async (req, res) => {
    var prod = await Product.find({})
        .then(function(prod) {
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
            prod.name = req.body.prod.name;
        }
        if(typeof req.body.prod.color !== 'undefined'){
            prod.color = req.body.prod.color;
        }
        if(typeof req.body.prod.description !== 'undefined'){
            prod.description = req.body.prod.description;
        }
        if(typeof req.body.prod.image !== 'undefined'){
            prod.image = req.body.prod.image;
        }
        if(typeof req.body.prod.price !== 'undefined'){
            prod.price = req.body.prod.price;
        }
        if(typeof req.body.prod.inStock !== 'undefined'){
            prod.inStock = req.body.prod.inStock;
        }
        if(typeof req.body.prod.subcategory !== 'undefined'){
            prod.subcategory = req.body.prod.subcategory;
        }
        return prod.save().then(function(){
            return res.json({prod: prod.toAuthJSON()});
        });
    }).catch(next);
});

module.exports = router;