// const jwks = require('jwks-rsa');
// const { expressjwt: jwt } = require("express-jwt");
// const express = require('express')
// const path = require('path')
// const app = express();

// // app.use(express.static(path.join(__dirname, 'frontend')));

// const checkJwt = jwt({
//   secret: jwks.expressJwtSecret({    
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://dev-qxzngmucus86xphq.us.auth0.com/.well-known/jwks.json`
//   }),
//   // Validate the audience and the issuer.}),
//   audience: 'Vehicle Maintenance',
//   issuer: `https://dev-qxzngmucus86xphq.us.auth0.com/`,
//   algorithms: ['RS256']
// })
// .unless({ path: ['/']})

// app.use(checkJwt)



  
  


// module.exports = {
//   checkJwt
// }