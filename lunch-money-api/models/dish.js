const Joi = require('joi');
const mongoose = require('mongoose');

const Dish = mongoose.model('Dish', new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 100 
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
    cost: { 
        type: Number,
        min: 0,
        max: 10000,
        required: true
    },
    description: {
        type: String,
        required: false,
        maxlength: 300
    }
}));


function validatedish(dish) {
    const schema = {
        name: Joi.string().min(3).required(),
        price: Joi.number().required(),
        cost: Joi.number().required(),
        quantity: Joi.number().required(),
        description: Joi.string()
    };

    return Joi.validate(dish, schema);
}

exports.Dish = Dish;
exports.validatedish = validatedish;