const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, (request, response) => {
 response.status(201).json({
   message: 'The task has been created'
 });
})
router.get('/', (request, response) => {
 response.status(200).json({
   message: 'Takes have been fetched'
 });
})
router.get('/:taskId', (request, response) => {
const id = request.params.tasksId;
 response.status(200).json({
   message: `Task with ID = ${id} was fetched`
 });
})

router.patch('/:taskId', (request, response) => {
    const id = request.params.tasksId;
     response.status(200).json({
       message: `Task with ID = ${id} was updated`
     });
    })

router.delete('/:taskId', (request, response) => {
    const id = request.params.tasksId;
        response.status(200).json({
        message: `Task with ID = ${id} was deleted`
    });
})

   module.exports = router;