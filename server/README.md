This is a Node.js server which can be used for Local testing of the React App. 

- launch the server on port 8080

### GET Products
- Endpoint: http://localhost:8080/products
```JSON
[
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
]
```

### POST Product
- Endpoint: http://localhost:8080/product
```JSON
[
    {
        "productId": "101",
        "name": "Product One",
        "description": "This is the first Product.",
        "price": 110,
        "qty": 100
    }
]
```