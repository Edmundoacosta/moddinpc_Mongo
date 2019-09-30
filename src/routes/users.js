const express = require('express');
const router = express.Router();
const auth = require('./auth');
const User = require('../models/user');
const mongoose = require('mongoose');
const passport = require('passport');

router.post("/register", async (req, res, next) => {
	var user = new User(req.body);
	user.setPassword(req.body.password);

	user.save().then(function(){
		return res.json({user: user.toAuthJSON()});
	}).catch(next);
});

router.post("/login", async(req,res, next) => {
	if(!req.body.user.email){
        return res.status(422).json({errors: {email: "can't be blank."}});
    }
    if(!req.body.user.password){
        return res.status(422).json({errors: {password: "can't be blank."}});
    }
	passport.authenticate('local', {session: false}, function(err, user, info){
		if(err){return next(err);}
		if (user) {
			user.token = user.generateJWT();
			return res.json({user: user.toAuthJSON()});
		} else {
			return res.status(422).json(info);
		}
	})(req,res,next)
});

router.get('/', auth.required, function(req,res,next){
    let result = {};
    User.findById(req.payload.id)
        .select('-password -hash -salt')
        .populate('addresses')
        .then(function(user){
        if(!user){return res.sendStatus(401);}
        return res.json({user: user});
    }).catch(next);
});

router.get('/all', async (req, res) => {
    var user = await User.find({});
    return res.send({
        status: 200,
        message: 'OK',
        result: user
    });
});

router.put('/user', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){return res.sendStatus(401);}
        if(typeof req.body.user.address1 !== 'undefined'){
            user.address1 = req.body.user.address1;
        }
        if(typeof req.body.user.address2 !== 'undefined'){
            user.address2 = req.body.user.address2;
        }
        if(typeof req.body.user.department !== 'undefined'){
            user.department = req.body.user.department;
        }
        if(typeof req.body.user.postalcode !== 'undefined'){
            user.postalcode = req.body.user.postalcode;
        }
        if(typeof req.body.user.password !== 'undefined'){
            user.setPassword(req.body.user.password);
        }
        return user.save().then(function(){
            return res.json({user: user.toAuthJSON()});
        });
    }).catch(next);
});

router.use(function(err,req,res,next){
    if(err.name === 'ValidationError'){
        return res.json({
            errors: Object.keys(err.errors).reduce(function(errors ,key){
                errors[key] = err.errors[key].message;
                return errors;
            }, {})
        })
    }
    return next(err);
});

module.exports = router;