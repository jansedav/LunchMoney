const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 100 
    },
    name:{
        type: String,
        required: true
    },
    restaraunt:{
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

function validateuser(food) {
    const schema = {
        username: Joi.string().required(),
        name: Joi.string().required(),
        restaraunt: Joi.string().required()
    };

    return Joi.validate(food, schema);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validateuser = validateuser;