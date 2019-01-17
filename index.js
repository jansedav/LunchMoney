const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const foods = [
    {id:1, name: 'Banana', quantity: '10', purchased: '1/2/19', expired: '1/10/19'},
    {id:2, name: 'Apple', quantity: '16', purchased: '1/3/19', expired: '1/20/19'},
    {id:3, name: 'Orange', quantity: '20', purchased: '1/8/19', expired: '1/18/19'}
];

app.get('/', (req, res) => {
    res.send('Hello Welcome To LunchMoney');
}); 

app.get('/api/foods', (req, res) => {
    res.send(foods);
});

app.get('/api/foods/:id', (req, res) => {
    
  const food = foods.find(co => co.id === parseInt(req.params.id));
  if(!food) res.status(404).send('The food with the given ID is not found!')
  res.send(food);
});

app.post('/api/foods', (req, res) => {
    
    const { error } = validatefood(req.body); //result.error
    if(error) return res.status(400).send(result.error.details[0].message)

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

app.put('/api/foods/:id', (req, res) => {
    const food = foods.find(co => co.id === parseInt(req.params.id));

    if(!food) return res.status(404).send('The food with the given ID is not found!');

    const { error } = validatefood(req.body); //result.error
    if(error) return res.status(400).send(result.error.details[0].message)

    food.name = req.body.name;
    food.quantity = req.body.quantity;
    res.send(food);
});

app.delete('/api/foods/:id', (req, res) => {
    const food = foods.find(co => co.id === parseInt(req.params.id));

    if(!food) return res.status(404).send('The food with the given ID is not found!');


    const index = foods.indexOf(food);
    foods.splice(index, 1);
    res.send(food);
});

function validatefood(food) {
    const schema = {
        name: Joi.string().min(3).required(),
        quantity: Joi.string().min(1).required()
    };

    return Joi.validate(food, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

