const express = require('express');
const router = express.Router();
const {Dish, validatedish} = require('../models/dish');
const {User} = require('../models/user');

router.get('/', async (req, res) => {
    const dishes = await Dish.find().sort('name');
    res.send(dishes);
});

router.get('/:id', async (req, res) => {
  const dishes = await Dish.findById(req.params.id);

  if(!dishes) res.status(404)
  .send('The dish with the given ID is not found!')
  res.send(dishes);
});

router.post('/', async (req, res) => {
    const { error } = validatedish(req.body); 
    if(error) return res.status(400).send(error)

    const user = await User.findById(req.body.userID);
    if(!user) return res.status(400).send('Invalid User');

    const dish = new Dish({
        name: req.body.name,
        userID: {
            _id: user._id,
            name: req.body.name,
            email: req.body.email,
            restaurant: req.body.restaurant,
            password: req.body.password
        },
        price: req.body.price,
        quantity: req.body.quantity,
        purchased: req.body.purchased,
        description: req.body.description
    });
    await dish.save();

    res.send(dish);
});

router.put('/:id', async (req, res) => {  
    const { error } = validatedish(req.body); 
    if(error) return res.status(400).send(error)
    
    const user = await User.findById(req.body.userID);
    if(!user) return res.status(400).send('Invalid User');

    const dish = await Dish.findOneAndUpdate(req.params.id,
        {
            name: req.body.name,
            userID: {
                _id: user._id,
                name: req.body.name,
                email: req.body.email,
                restaurant: req.body.restaurant,
                password: req.body.password
            },
            price: req.body.price,
            quantity: req.body.quantity,
            purchased: req.body.purchased,
            description: req.body.description
        }
    , { new: true });

    if(!dish) return res.status(404)
    .send('The dish with the given ID is not found!');

    res.send(dish);
});

router.delete('/:id', async (req, res) => {
    const dish = await Dish.findOneAndDelete(req.params.id);

    if(!dish) return res.status(404)
    .send('The dish with the given ID is not found!');

    res.send(dish);
});

module.exports = router;