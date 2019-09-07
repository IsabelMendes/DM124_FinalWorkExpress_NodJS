const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');
const uuidv1 = require('uuid/v1');
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "dynamodb.us-east-1.amazonaws.com"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const table = "entrega";

router.post('/', checkAuth, (request, response) => {
    const params = {
        TableName:table,
        Item:{
            "id":uuidv1(),
            "idPedido":request.body.idPedido,
            "idCliente":request.body.idCliente,
            "nomeRecebedor": request.body.nomeRecebedor,
            "cpfRecebedor": request.body.cpfRecebedor,
            "recebedorComprador":request.body.recebedorComprador,
            "dataEntrega":request.body.dataEntrega,
            "horaEntrega": request.body.horaEntrega,
            "localizaçãoGeografica": request.body.localizaçãoGeografica
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", err);
            response.status(400).json(err);
        } else {
            console.log("Item added :", params.Item);
            response.status(201).json(params.Item);
        }
    });
    
});

router.get('/', (request, response) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: table
    };

    docClient.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", err);
            response.status(400).json(err);
        } else {
            console.log("Items:", data);
            const { Items } = data;
            response.status(201).json(Items);
        }
    });
});


router.get('/:entregaId', (request, response) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: table,
        Key:{
            "id": request.params.entregaId
        }
    };

    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", err);
            notFound(request,response);
        } else {
            if (typeof data.Item !== 'undefined') {
                console.log("GetItem succeeded:", data.Item);
                response.json(data.Item);
            } else {
                notFound(request, response);
            }
        }
    });

});

router.put('/:entregaId', checkAuth, (request, response) => {
    const params = {
        TableName:table,
        Key: {
            "id":request.params.entregaId
        },
        UpdateExpression: "set idPedido = :idPedido, idCliente = :idCliente, nomeRecebedor = :nomeRecebedor, cpfRecebedor = :cpfRecebedor, recebedorComprador = :recebedorComprador, dataEntrega = :dataEntrega, horaEntrega = :horaEntrega",
        ExpressionAttributeValues:{
            ":idPedido":request.body.idPedido,
            ":idCliente":request.body.idCliente,
            ":nomeRecebedor": request.body.nomeRecebedor,
            ":cpfRecebedor": request.body.cpfRecebedor,
            ":recebedorComprador":request.body.recebedorComprador,
            ":dataEntrega":request.body.dataEntrega,
            ":horaEntrega": request.body.horaEntrega
        },
        ReturnValues:"UPDATED_NEW"
    };

    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", err);
            response.status(400).json(err);
        } else {
            console.log("Item updated:", params.Item);
            response.status(200).json(request.body);
        }
    });
    
});
   
   router.delete('/:entregaId', checkAuth, (request, response) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: table,
        Key:{
            "id": request.params.entregaId
        }
    };

    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", err);
            notFound(request,response);
        } else {
            console.log("Data:", data);
            response.status(200).json(data);
        }
    });
   });
   
module.exports = router;