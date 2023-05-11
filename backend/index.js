const express = require('express')
const app = express();
const cors = require('cors')
const mysql = require('mysql2')
const port = 5000;

app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "M@renco23",
    database: "capstone"
})

app.get('/', (req,res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err,data) => {
        if (err) return res.json("Error");
        return res.json(data)
    })
})


app.listen(port, () => {
    console.log('listening on port 5000')
})
