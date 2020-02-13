const express = require('express');
const router = express.Router();
const auth = require('./auth');
const User = require('../models/user');
const mongoose = require('mongoose');
const passport = require('passport');
const nodeMailer = require('nodemailer');

router.post("/register", async (req, res, next) => {
	var user = new User(req.body);
	user.setPassword(req.body.password);

	user.save().then(function(){
		return res.json({user: user.toAuthJSON()});
	}).catch(next);
});

router.post("/password", async (req, res, next) => {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user: 'edmundoach23@gmail.com',
      pass: 'Serelmejor18'
    }
  });
  let mailOptions = {
      to: 'darkmegion@gmail.com',
      subject: 'Recuperar contraseña ecogozo',
      html: '<p>Chupapinga</p>'
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
  res.end();
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

router.get('/user', auth.required, function(req,res,next){
    let result = {};
    User.findById(req.payload.id)
        .select('-password -hash -salt')
        .populate('addresses')
        .populate('transactions')
        .then(function(user){
        if(!user){return res.sendStatus(401);}
        return res.json({user: user});
    }).catch(next);
});

router.get('/all', async (req, res) => {
    var user = await User.find({})
      .populate('addresses')
      .then(function(user) {
          return res.send({
              status: 200,
              message: 'OK',
              result: user
          });
      })
});

router.put('/user', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){return res.sendStatus(401);}
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