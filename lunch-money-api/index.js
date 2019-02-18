const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const foods = require('./routes/foods');
const home = require('./routes/home');
const users = require('./routes/users');
const dishes = require('./routes/dishes');
const auth = require('./routes/auth');
const app = express();
const mongoose = require('mongoose');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR, jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/foods', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB'))

mongoose.set('useCreateIndex', true);


app.use(express.json());
app.use('/api/foods', foods);
app.use('/api/users', users);
app.use('/api/dishes', dishes);
app.use('/api/auth', auth);
app.use('/', home);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

