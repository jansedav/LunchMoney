const express = require('express');
const router = express.Router()
const Joi = require('joi');
const mongoose = require('mongoose');

const foods = [
    {id:1, name: 'Banana', quantity: '10', purchased: '1/2/19', expired: '1/10/19'},
    {id:2, name: 'Apple', quantity: '16', purchased: '1/3/19', expired: '1/20/19'},
    {id:3, name: 'Orange', quantity: '20', purchased: '1/8/19', expired: '1/18/19'}
];

const foodSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    purchased: { type: Date, default: Date.now },
    expires: Date
});

const Food = mongoose.model('Food', foodSchema);

async function createFood(){
    const food = new Food({
        name: 'Grape',
        Quantity: 10,
        expires: 2019-01-25
    });
    const result = await food.save();
    console.log(result);
}

async function getFoods() {
    Food.find()
}

getFoods();
createFood();


router.get('/', (req, res) => {
    res.send(foods);
});

router.get('/:id', (req, res) => {
    
  const food = foods.find(co => co.id === parseInt(req.params.id));
  if(!food) res.status(404).send('The food with the given ID is not found!')
  res.send(food);
});

router.post('/', (req, res) => {
    
    const { error } = validatefood(req.body); //result.error
    if(error) return res.status(400).send(error)

    const food = {
        id: foods.length + 1, 
        name: req.body.name,
        quantity: req.body.quantity,
        purchased: req.body.purchased,
        expired: req.body.expired
    };

    foods.push(food);
    res.send(food);
});

router.put('/:id', (req, res) => {
    const food = foods.find(co => co.id === parseInt(req.params.id));

    if(!food) return res.status(404).send('The food with the given ID is not found!');

    const { error } = validatefood(req.body); //result.error
    if(error) return res.status(400).send(error)

    food.name = req.body.name;
    food.quantity = req.body.quantity;
    res.send(food);
});

router.delete('/:id', (req, res) => {
    const food = foods.find(co => co.id === parseInt(req.params.id));

    if(!food) return res.status(404).send('The food with the given ID is not found!');


    const index = foods.indexOf(food);
    foods.splice(index, 1);
    res.send(food);
});

function validatefood(food) {
    const schema = {
        name: Joi.string().min(3).required(),
        quantity: Joi.string().required(),
        purchased: Joi.string().required(),
        expired: Joi.string().required()
    };

    return Joi.validate(food, schema);
}

module.exports = router;