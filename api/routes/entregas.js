const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');

let db = {};
let sequence = 0;

router.post('/', checkAuth, (request, response) => {
    const newEntrega = {
        id: ++sequence,
        idPedido:request.body.idPedido,
        idCliente:request.body.idCliente,
        nomeRecebedor: request.body.nomeRecebedor,
        cpfRecebedor: request.body.cpfRecebedor,
        recebedorComprador:request.body.recebedorComprador,
        dataEntrega:request.body.dataEntrega,
        horaEntrega: request.body.horaEntrega,
        localizaçãoGeografica: request.body.localizaçãoGeografica
    };

    db[newEntrega.id] = newEntrega;

    response.status(201).json(newEntrega);
})

router.get('/', (request, response) => {
    const toArray = key => db[key];
    const entregas = Object.keys(db).map(toArray);
    entregas && entregas.length
        ? response.json(entregas)
        : response.status(204).send();
});

router.get('/:entregaId', (request, response) => {
    const entrega = db[request.params.entregaId];
    entrega
        ? response.json(entrega)
        : notFound(request, response);
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