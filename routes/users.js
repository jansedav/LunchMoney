const express = require('express');
const router = express.Router();
const {User, validateuser} = require('../models/user');






/*router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/:id', async (req, res) => {
  const users = await User.findById(req.params.id);

  if(!users) res.status(404)
  .send('The user with the given ID is not found!')
  res.send(users);
});
*/
router.post('/', async (req, res) => {
    const { error } = validateuser(req.body); 
    if(error) return res.status(400).send(error)

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists!');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        restaurant: req.body.restaurant,
        password: req.body.password
    })

    user = await user.save();

    res.send(user);
});
/*
router.put('/:id', async (req, res) => {  
    const { error } = validateuser(req.body); 
    if(error) return res.status(400).send(error)
    
    const user = await User.findOneAndUpdate(req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            restaraunt: req.body.restaraunt,
            password: req.body.password
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
*/
module.exports = router;