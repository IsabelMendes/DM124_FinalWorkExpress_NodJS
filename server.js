const http = require('http');
const app = require('./app');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

http.createServer(app)
<<<<<<< HEAD
 .listen(port, () => {
   console.log(`Server up on http://${host}:${port}`);
 });
=======
  .listen(port, () => {
    console.log(`Server up on http://${host}:${port}`);
  })
>>>>>>> 529d410d18d66a186db72a038b380bcc38180bb8
