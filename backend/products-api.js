const AWS = require('aws-sdk');
AWS.config.update( {
  region: 'us-east-1'
});
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const dynamoDBTable = 'cc-products-db';

const productsRoute = '/products';
const productRoute = '/product';


async function getProducts() {
    const params = {
        TableName: dynamoDBTable
    };
  
    const products = await scanTable(params, []);
    console.log(products);
    const body =  products;
  
    return {
        statusCode: 200,
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods" : "OPTIONS,GET",
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" : "*",
            "X-Requested-With" : "*"
        },
        body: JSON.stringify(body)
    };
}

async function scanTable(params, products) {
    try {
        const productsData = await dynamoDB.scan(params).promise();
        products = products.concat(productsData.Items);
    
        if (productsData.LastEvaluatedKey) {
            params.ExclusiveStartkey = productsData.LastEvaluatedKey;
            return await scanTable(params, products);
        }
    
        return products;
    } catch(err) {
        console.error('error', err);
    }
}


async function saveProduct(request) {
    const params = {
        TableName: dynamoDBTable,
        Item: request
    };
                 
    return await dynamoDB.put(params).promise().then(() => {
        const body = {
            Operation: 'SAVE',
            Message: 'SUCCESS',
            Item: request
        };
                 
        return {
            statusCode: 200,
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Methods" : "OPTIONS,POST",
                "Access-Control-Allow-Credentials" : true,
                "Access-Control-Allow-Origin" : "*",
                "X-Requested-With" : "*"
            },
            body: JSON.stringify(body)
        };
    }, err => {
        console.error('error', err);
    });
}


exports.handler = async function(event) {
    console.log(event);
    console.log(event.body);

    let response = {};

    switch(true) {
        case event.httpMethod === 'GET' && event.path === productsRoute:
        response = await getProducts();
        break;
    case event.httpMethod === 'POST' && event.path === productRoute:
        response = await saveProduct(JSON.parse(event.body));
        break;
    default:
        response = {
            statusCode: 404,
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Methods" : "OPTIONS,GET",
                "Access-Control-Allow-Credentials" : true,
                "Access-Control-Allow-Origin" : "*",
                "X-Requested-With" : "*"
            },
            body: 'Page not found'
        };
        break;
    }

    return response;
}