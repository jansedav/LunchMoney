const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const {Food, validatefood} = require('../models/food');

router.get('/', auth, async (req, res) => {
    const foods = await Food.find().sort('name');
    res.send(foods);
});

router.get('/:id', auth, async (req, res) => {
  const foods = await Food.findById(req.params.id);

  if(!foods) res.status(404)
  .send('The food with the given ID is not found!')
  res.send(foods);
});

router.post('/', auth, async (req, res) => {

    const { error } = validatefood(req.body); 
    if(error) return res.status(400).send(error)

    const food = new Food({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        purchased: req.body.purchased,
        expires: req.body.expires,
        description: req.body.description
    });
    await food.save();

    res.send(food);
});

router.put('/:id', auth, async (req, res) => {  
    const { error } = validatefood(req.body); 
    if(error) return res.status(400).send(error)

    const food = await Food.findOneAndUpdate({_id: req.params.id},
        {
            name: req.body.name,
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

router.delete('/:id', auth, async (req, res) => {
    const food = await Food.findOneAndDelete({_id: req.params.id});
    console.log("Fetched ID " + req.params.id)
    if(!food) return res.status(404)
    .send('The food with the given ID is not found!');

    res.send(food);
});

module.exports = router;