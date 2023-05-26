const jwks = require('jwks-rsa');
const { expressjwt: jwt } = require("express-jwt");
const express = require('express')
const app = express();



const checkJwt = jwt({
  secret: jwks.expressJwtSecret({    
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-yhqpkv3jpefleo1k.us.auth0.com/.well-known/jwks.json`
  }),
  // Validate the audience and the issuer.}),
  audience: 'capstone app',
  issuer: `https://dev-yhqpkv3jpefleo1k.us.auth0.com/`,
  algorithms: ['RS256']
})
.unless({ path: ['/']})

app.use(checkJwt)



  
  


module.exports = {
  checkJwt
}