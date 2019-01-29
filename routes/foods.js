const express = require('express');
const router = express.Router();
const {Food, validatefood} = require('../models/food');
const {User} = require('../models/user');

router.get('/', async (req, res) => {
    const foods = await Food.find().sort('name');
    res.send(foods);
});

router.get('/:id', async (req, res) => {
  const foods = await Food.findById(req.params.id);

  if(!foods) res.status(404)
  .send('The food with the given ID is not found!')
  res.send(foods);
});

router.post('/', async (req, res) => {
    const { error } = validatefood(req.body); 
    if(error) return res.status(400).send(error)

    const user = await User.findById(req.body.userID);
    if(!user) return res.status(400).send('Invalid User');

    let food = new Food({
        name: req.body.name,
        userID: {
            _id: user._id,
            name: user.name,
            restaraunt: user.restaraunt,
            username: user.username
        },
        price: req.body.price,
        quantity: req.body.quantity,
        purchased: req.body.purchased,
        expires: req.body.expires,
        description: req.body.description
    });
    food = await food.save();

    res.send(food);
});

router.put('/:id', async (req, res) => {  
    const { error } = validatefood(req.body); 
    if(error) return res.status(400).send(error)
    
    const user = await User.findById(req.body.userID);
    if(!user) return res.status(400).send('Invalid User');

    const food = await Food.findOneAndUpdate(req.params.id,
        {
            name: req.body.name,
            userID: {
                _id: user._id,
                name: user.name,
                restaraunt: user.restaraunt,
                username: user.username
            },
            price: req.body.price,
            quantity: req.body.quantity,
            purchased: req.body.purchased,
            expires: req.body.expires,
            description: req.body.description
        }
    , { new: true });

    if(!food) return res.status(404)
    .send('The food with the given ID is not found!');

    res.send(food);
});

router.delete('/:id', async (req, res) => {
    const food = await Food.findOneAndDelete(req.params.id);

    if(!food) return res.status(404)
    .send('The food with the given ID is not found!');

    res.send(food);
});

module.exports = router;