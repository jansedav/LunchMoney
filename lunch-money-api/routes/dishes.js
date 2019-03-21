const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const {Dish, validatedish} = require('../models/dish');

router.get('/', auth, async (req, res) => {
    const dishes = await Dish.find().sort('name');
    res.send(dishes);
});

router.get('/:id', auth, async (req, res) => {
  const dishes = await Dish.findById(req.params.id);

  if(!dishes) res.status(404)
  .send('The dish with the given ID is not found!')
  res.send(dishes);
});

router.post('/', auth, async (req, res) => {
    const { error } = validatedish(req.body); 
    if(error) return res.status(400).send(error)

    const dish = new Dish({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        cost: req.body.cost,
        description: req.body.description
    });
    await dish.save();

    res.send(dish);
});

router.put('/:id', auth, async (req, res) => {  
    const { error } = validatedish(req.body); 
    if(error) return res.status(400).send(error)
    
    const dish = await Dish.findOneAndUpdate({_id: req.params.id},
        {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            cost: req.body.cost,
            description: req.body.description
        }
    , { new: true });

    if(!dish) return res.status(404)
    .send('The dish with the given ID is not found!');

    res.send(dish);
});

router.delete('/:id', auth, async (req, res) => {
    const dish = await Dish.findOneAndDelete({_id: req.params.id});

    if(!dish) return res.status(404)
    .send('The dish with the given ID is not found!');

    res.send(dish);
});

module.exports = router;