const express = require('express');
const router = express.Router()
const Joi = require('joi');
const mongoose = require('mongoose');


const foodSchema = new mongoose.Schema({
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
    purchased: { type: Date, default: Date.now },
    expires: Date
});

const Food = mongoose.model('Food', foodSchema);

async function createFood(){
    const food = new Food({
        name: 'Grape',
        quantity: 10,
        expires: 2019-01-25
    });

    try{
        const result = await food.save();
        console.log(result);
    }
    catch(ex){
        console.log(ex.message);
    }
}


async function getFoods() {


    const foods = await Food
    .find()
    .or([ { name: 'Grape' }, { Quantity: 10 } ])
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1});
    console.log(foods);
}


async function updateFood(id) {
    const food = await Food.findByIdAndUpdate(id, {
        $set: {
            name: 'Pee'
        }
    }, { new: true });
    console.log(food);
}

async function removeFood(id) {
    const food = await Food.findByIdAndRemove(id);
    console.log(food);
}

removeFood('5c4275ad26536603057e25e9');
updateFood('5c4275ad26536603057e25e9');
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