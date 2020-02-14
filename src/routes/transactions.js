const express = require('express');
const router = express.Router();
const auth = require('./auth');
const Transactions = require('../models/transactions');
const User = require('../models/user');
const mongoose = require('mongoose');

router.get('/all', async (req, res) => {
    var tran = await Transactions.find({})
        .populate('subcategories')
        .then(function(tran) {
            return res.send({
                status: 200,
                message: 'OK',
                result: tran
            });
        })
});

router.post('/create', auth.required, function(req,res,next){
    let result = {};
    Transactions.create(req.body)
    	.then(function(tran){
            result = tran;
            return User.findByIdAndUpdate(req.payload.id, { $push: {transactions: tran._id}});
    	}).then(function(user){
            res.send({
                status: 201,
                result: user
            });
        });
});

router.put('/update', auth.required, function(req,res,next){
    Transactions.findById(req.params.id).then(function(tran){
        if(!tran){return res.sendStatus(401);}
        if(typeof req.body.tran.status !== 'undefined'){
            tran.status = req.body.tran.status;
        }
        return tran.save().then(function(){
            return res.json({tran: tran.toAuthJSON()});
        });
    }).catch(next);
});

module.exports = router;