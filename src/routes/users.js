var express = require('express');
var router = express.Router();

const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const constants = require('../../lib/constants');
const mongoose = require('mongoose');


router.post("/register", async (req, res) => {

});