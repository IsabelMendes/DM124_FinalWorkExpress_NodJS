const express = require('express');
const app = express();

app.use((request, response, next) => {
<<<<<<< HEAD
    console.log(request.method, request.url);
 response.status(200).json({
   message: 'It works baby!'
 });
=======
  console.log(request.method, request.url);
  response.status(200).json({
    message: 'It just works baby!!'
  })
>>>>>>> 529d410d18d66a186db72a038b380bcc38180bb8
});

module.exports = app;