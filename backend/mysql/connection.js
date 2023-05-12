require('dotenv').config()
const mysql = require('mysql2');

const host = process.env.HOST
const dbUserName = process.env.DBUSERNAME
const password = process.env.PASSWORD
const database = process.env.DATABASE

class Connection {
    constructor() {
        if (!this.pool) {
            console.log('creating connection...')
            this.pool = mysql.createPool({
                connectionLimit: 100,
                host: host,
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

module.exports = instance;