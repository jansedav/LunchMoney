const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 75,
        unique: true
    },
    restaurant:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1500,
    }
});

const User = mongoose.model('User', userSchema);

function validateuser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(75).required().email(),
        restaurant: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(1500).required()
    };

    return Joi.validate(user, schema);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validateuser = validateuser;