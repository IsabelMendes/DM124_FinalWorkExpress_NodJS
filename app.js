const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/tasks', require('./api/routes/tasks'));
app.use('/api/products', require('./api/routes/products'));
app.use('/api/entregas', require('./api/routes/entregas'));
app.use('/api/health', require('./api/routes/health'));
app.use(require('./api/middleware/not-found'));

module.exports = app;