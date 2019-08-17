const checkAuth = (request, response, next) => {

    const token = request.headers.authorization;
    console.log('Token ===>'+ token);
    next();
 
   };
   
   module.exports = checkAuth;