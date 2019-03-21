const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const {User} = require('../models/user');
const Joi = require('joi');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.body);
    const { error } = validate(req.body); 
    if(error) return res.status(400).send(error)

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    var username = user.name;
    const token = user.generateAuthToken();
    
    var response = {
        result:{
        token, 
        username
        }
    }


    res.send(response);
});


function validate(user) {
    const schema = {
        email: Joi.string().min(5).max(75).required().email(),
        password: Joi.string().min(5).max(1500).required()
    };

    return Joi.validate(user, schema);
}


module.exports = router;