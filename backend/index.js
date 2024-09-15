const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({region: 'us-east-2'});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event, context) => {
    let response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: null,
    };

    const getData = async () => {
        const params = {
            TableName: "game15",
        };
        const command = new ScanCommand(params);
        const res = await docClient.send(command);
        response.body = JSON.stringify(res.Items);
        return res.Items;
    };

    if (event.httpMethod === 'GET') {
        await getData(); 
    }

    if (event.httpMethod === 'POST') {
        const parsedBody = JSON.parse(event.body);
        console.log('parsedBody', parsedBody);
        const input = {
            "Item": {
                time: parsedBody.time,
                moves: parsedBody.moves,
                name: parsedBody.name,
                id: parsedBody.id
            },
            "TableName": "game15"
        };
        const command = new PutCommand(input);
        await docClient.send(command);
        await getData();
    }

    return response;
};

// The above code was done manually on AWS. Node v20.

// Legacy code 
// const { DynamoDB } = require("@aws-sdk/client-dynamodb");
// const dynamoDB = new DynamoDB({ region: 'us-east-2', apiVersion: '2012-08-10' });
// const { unmarshall } =  require("@aws-sdk/util-dynamodb");

// exports.handler = (event, context, callback) => {
    // const getData = (params) => {
    //     dynamoDB.scan(params, (err, data) => {
    //       if (err) {
    //           callback(err)
    //       } else {
    //             const unmarshalledData = data.Items.map(el => {
    //                 return unmarshall(el)
    //             })
                
    //             const response = {
    //                 "statusCode": 200,
    //                 "body": JSON.stringify(unmarshalledData),
    //                 "headers": {
    //                     "Access-Control-Allow-Origin": "*",
    // 	            "Access-Control-Allow-Credentials": true
    //                 }
    
    //             };

    //             callback(null, response)
    //       }
    //     })
    // }
    
    // const params = {
    //     TableName: 'game15'
    // }
    
    // if (event.httpMethod === 'GET') {
    //         getData(params)
    // }
    
    // if (event.httpMethod === 'POST') {
    //     const parsedBody = JSON.parse(event.body);
        
    //     dynamoDB.putItem({
    //         TableName: "game15",
    //         Item : {
    //             "time": {N: parsedBody.time},
    //             "moves": {N: parsedBody.moves},
    //             "name": {S: parsedBody.name},
    //             "id": {S: parsedBody.id}
    //         }
    //     }, function(err, data) {
    //         if (err) {
    //             console.log('Error putting item into dynamodb failed: '+err);
    //         }
    //         else {
    //             getData(params)
    //         }
    //     });
    // }
// }