// const mysql = require('mysql2/promise');
import mysql from 'mysql2/promise'
import * as dotenv from 'dotenv';
dotenv.config();

const host = process.env.HOST
const dbUserName = process.env.DBUSERNAME
const password = process.env.PASSWORD
const database = process.env.DATABASE
const clientSecret = process.env.CLIENTSECRET

class Connection {
    constructor() {
        if (!this.pool) {
            this.pool = mysql.createPool({
                connectionLimit: 25,
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
// });

const con = await instance.getConnection();

console.log(`[MySQL] Connection to ${database} established.`);

console.log("[MySQL] Initializing database...");

async function initializeDatabase() {

  const createStatements = [
    `CREATE TABLE IF NOT EXISTS users (
      id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(100) NOT NULL UNIQUE KEY
    );`,
    
    `CREATE TABLE IF NOT EXISTS vehicles (
      v_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(100) NOT NULL UNIQUE KEY,
        v_ymm VARCHAR(100),
        v_trim VARCHAR(50),
        v_engine VARCHAR(50),
        v_transmission VARCHAR(50),
        vin VARCHAR(50) NOT NULL UNIQUE KEY,
        mileage INT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    );`,
    
    `CREATE TABLE IF NOT EXISTS repairLog (
      repair_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(100) NOT NULL UNIQUE KEY,
        v_id INT NOT NULL UNIQUE KEY,
        repair_mileage INT,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        maintenance VARCHAR(200),
        performed_by VARCHAR(50),
        contact VARCHAR(50),
        material INT,
        labor INT,
        other INT,
        FOREIGN KEY(user_id) REFERENCES users(user_id),
        FOREIGN KEY(v_id) REFERENCES vehicles(v_id) ON DELETE CASCADE
    );`
  ];

  const alterStatements = [
    `ALTER TABLE repairLog MODIFY CONSTRAINT FOREIGN KEY (v_id) REFERENCES vehicles(v_id) ON DELETE CASCADE;`,
    `ALTER TABLE repairLog 
    DROP FOREIGN KEY vehicle_id,
    ADD CONSTRAINT v_id FOREIGN KEY (v_id) REFERENCES vehicles(v_id) ON DELETE CASCADE;
    `
];

  try {
    for (let statement of createStatements) {
      await con.execute(statement);
    }
    for (let statement of alterStatements) {
      await con.execute(statement);
  }
    console.log("[MySQL] Database initialized successfully.");
  } catch (error) {
    console.error("[MySQL] Error initializing database:", error);
  }
}

initializeDatabase();

export default instance;

