const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// enable CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Hard-Coded for demo
const PRODUCTS = [
    {
        "productId": "101",
        "name": "Product One",
        "description": "This is the first Product.",
        "price": 110,
        "qty": 100
    },
    {
        "productId": "102",
        "name": "Product Two",
        "description": "This is the second Product.",
        "price": 120,
        "qty": 100
    },
    {
        "productId": "103",
        "name": "Product Three",
        "description": "This is the third Product.",
        "price": 130,
        "qty": 100
    }
];

// GET: http://localhost:8080/products
app.get('/products', (req, res) => {
  res.json(PRODUCTS);
});

// POST: http://localhost:8080/order
app.post('/order', (req, res) => {
    console.log(req.body);
    res.json({"success": true});
  });

app.listen(8080, () => {
   console.log('Server running on port 8080.'); 
});