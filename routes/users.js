const express = require('express');
const router = express.Router();
const {User, validateuser} = require('../models/user');

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/:id', async (req, res) => {
  const users = await User.findById(req.params.id);

  if(!users) res.status(404)
  .send('The user with the given ID is not found!')
  res.send(users);
});

router.post('/', async (req, res) => {
    const { error } = validateuser(req.body); 
    if(error) return res.status(400).send(error)

    let user = new User({
        username: req.body.username,
        name: req.body.name,
        restaraunt: req.body.restaraunt
    });
    user = await user.save();

    res.send(user);
});

router.put('/:id', async (req, res) => {  
    const { error } = validateuser(req.body); 
    if(error) return res.status(400).send(error)
    
    const user = await User.findOneAndUpdate(req.params.id,
        {
            username: req.body.username,
            name: req.body.name,
            restaraunt: req.body.restaraunt
        }
    , { new: true });

    if(!user) return res.status(404)
    .send('The user with the given ID is not found!');

    res.send(user);
});

router.delete('/:id', async (req, res) => {
    const user = await User.findOneAndDelete(req.params.id);

    if(!user) return res.status(404)
    .send('The user with the given ID is not found!');

    res.send(user);
});

module.exports = router;