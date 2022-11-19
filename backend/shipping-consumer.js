const AWS = require('aws-sdk');
AWS.config.update({
    "region": "us-east-1"
});
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const dynamoDBTable = 'cc-products-db';

exports.handler = async (event) => {
    console.log(JSON.stringify(event));
    let data  = {};
    
    for (const record of event.Records) {
        data = JSON.parse(Buffer.from(record.kinesis.data, 'base64'));
        console.log(data);
    }
    
    let productId = data.productId;
    console.log(productId);

    let updatedQty = data.qty - 1;
    
    const params = {
        TableName: dynamoDBTable,
        Key: {
            "productId": productId
        },
        UpdateExpression: 'set qty = :value',
        ExpressionAttributeValues: {
            ":value": updatedQty
        },
        returnValues: 'UPDATE_NEW'
    };
    
    return await dynamoDB.update(params).promise().then(response => {
       const body = {
           Operation: "UPDATE",
           Message: "SUCCESS",
           Item: response
       };

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };
    });
}