require('dotenv').config()
// const mysql = require('mysql2/promise');
const mysql = require('mysql2/promise');
const request = require('request')

const host = process.env.HOST
const dbUserName = process.env.DBUSERNAME
const password = process.env.PASSWORD
const database = process.env.DATABASE
const clientSecret = process.env.CLIENTSECRET

class Connection {
    constructor() {
        if (!this.pool) {
            console.log('creating connection...')
            this.pool = mysql.createPool({
                connectionLimit: 100,
                host: host,
                port: 3306,
                user: dbUserName,
                password: password,
                database: database,
                multipleStatements: true
            })
            return this.pool
        }
        return this.pool
    }
}
const instance = new Connection();

// var options = { method: 'POST',
//   url: 'https://dev-qxzngmucus86xphq.us.auth0.com/oauth/token',
//   headers: { 'content-type': 'application/json' },
//   body: `{"client_id":"SLntwjzj02adeo3WEg3Ux8WPkiUcSIte","client_secret":"${clientSecret}","audience":"https://dev-qxzngmucus86xphq.us.auth0.com/api/v2/","grant_type":"client_credentials"}` };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });

module.exports = instance;