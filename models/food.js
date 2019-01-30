const Joi = require('joi');
const mongoose = require('mongoose');
const {userSchema} = require('./user');

const Food = mongoose.model('Food', new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 100 
    },
    userID: {
        type: userSchema,
        required: true
    },
    price:{
        type: Number,
        min: 0,
        max: 10000,
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        max: 10000,
        required: true
    },
    purchased: { 
        type: Date, 
        required: true
    },
    expires: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false,
        maxlength: 300
    }
}));


function validatefood(food) {
    const schema = {
        name: Joi.string().min(3).required(),
        userID: Joi.objectId().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        purchased: Joi.string().required(),
        expires: Joi.string().required(),
        description: Joi.string()
    };

    return Joi.validate(food, schema);
}

exports.Food = Food;
exports.validatefood = validatefood;