const express = require('express');
const router = express.Router();
const auth = require('./auth');
const User = require('../models/user');
const constants = require('../../lib/constants');
const mongoose = require('mongoose');
const passport = require('passport');


router.post("/register", async (req, res, next) => {
	var user = new User();
	user.email = req.body.user.email;
	user.setPassword(req.body.user.password);

	user.save().then(function(){
		return res.json({user: user.toAuthJSON()});
	}).catch(next);
});

router.post("/login", async(req,res, next) => {
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

module.exports = router;