const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');
const uuidv1 = require('uuid/v1');


var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "entrega";

router.post('/', checkAuth, (request, response) => {
    var params = {
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
            console.log("Added item:", data);
            response.status(201).json(data);
        }
    });
    
})

router.get('/', (request, response) => {



    
    const toArray = key => db[key];
    const entregas = Object.keys(db).map(toArray);
    entregas && entregas.length
        ? response.json(entregas)
        : response.status(204).send();
});

router.get('/:entregaId', (request, response) => {
    var params = {
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
            console.log("GetItem succeeded:", data);
            response.json(data);
        }
    });

});

router.patch('/:entregaId', checkAuth, (request, response) => {
    const entrega = db[request.params.entregaId];
    const hasValue = request.body.recebedorComprador != null
    if (entrega) {
      entrega.idPedido = request.body.idPedido || entrega.idPedido;
      entrega.idCliente = request.body.idCliente || entrega.idCliente;
      entrega.nomeRecebedor = request.body.nomeRecebedor || entrega.nomeRecebedor;
      entrega.cpfRecebedor = request.body.cpfRecebedor || entrega.cpfRecebedor;
      entrega.dataEntrega = request.body.dataEntrega || entrega.dataEntrega;
      entrega.horaEntrega = request.body.horaEntrega || entrega.horaEntrega;
      entrega.localizaçãoGeografica = request.body.localizaçãoGeografica || entrega.localizaçãoGeografica;
      response.json(entrega);
    } else {
      notFound(request, response);
    }
   });
   
   router.delete('/:entregaId', checkAuth, (request, response) => {
    const entrega = db[request.params.entregaId];
    if(entrega) {
      delete db[entrega.id];
      response.status(200).json({
        message: 'Deleted'
      });
    } else {
      notFound(request, response);
    }
   });
   
module.exports = router;