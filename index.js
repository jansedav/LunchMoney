const Joi = require('joi');
const express = require('express');
const foods = require('./routes/foods');
const home = require('./routes/home');
const app = express();
app.use(express.json());

app.use('/api/foods', foods);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

