const express = require('express');
const router = express.Router()
const Joi = require('joi');
const mongoose = require('mongoose');



const Food = mongoose.model('Food', new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 100 
    },
    quantity: {
        type: Number,
        required: true
    },
    purchased: { 
        type: Date, 
        default: Date.now 
    },
    expires: {
        type: Date,
        required: true
    }
}));

/*
async function updateFood(id) {
    const food = await Food.findByIdAndUpdate(id, {
        $set: {
            name: 'Pee'
        }
    }, { new: true });
    console.log(food);
}
*/


router.get('/', async (req, res) => {
    const foods = await Food.find().sort('name');
    res.send(foods);
});

router.get('/:id', async (req, res) => {
  const foods = await Food
  .find()
  .or([ { _id:req.params.id } ])
  .limit(10)
  .sort({name: 1});

  if(!foods) res.status(404).send('The food with the given ID is not found!')
  res.send(foods);
});

router.post('/', async (req, res) => {
    const { error } = validatefood(req.body); //result.error
    if(error) return res.status(400).send(error)

    const food = new Food({
        name: req.body.name,
        quantity: req.body.quantity,
        purchased: req.body.purchased,
        expired: req.body.expired
    });
    try{
        const result = await food.save();
        console.log(result);
    }
    catch(ex){
        console.log(ex.message);
    }
    res.send(food);
});

router.put('/:id', async (req, res) => {
    const food = await Food.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            quantity: req.body.quantity,
            purchased: req.body.purchased,
            expired: req.body.expired

        }
    }, { new: true });

    if(!food) return res.status(404).send('The food with the given ID is not found!');

    const { error } = validatefood(req.body); //result.error
    if(error) return res.status(400).send(error)
    
    res.send(food);
});

router.delete('/:id', async (req, res) => {
    const food = await Food.findByIdAndRemove(req.params.id);

    if(!food) return res.status(404).send('The food with the given ID is not found!');

    res.send(food);
});

function validatefood(food) {
    const schema = {
        name: Joi.string().min(3).required(),
        quantity: Joi.string().required(),
        expired: Joi.string().required()
    };

    return Joi.validate(food, schema);
}

module.exports = router;