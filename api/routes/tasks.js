const express = require('express');
const router = express.Router();

router.post('/', (request, response) => {
 response.status(200).json({
   message: 'Handling POST requests to /tasks'
 });
})
router.get('/', (request, response) => {
 response.status(200).json({
   message: 'Handling GET requests to /tasks'
 });
})
router.get('/:tasksId', (request, response) => {
const id = request.params.tasksId;
 response.status(200).json({
   message: `Task with ID = ${id} was fetched`
 });
})

module.exports = router;