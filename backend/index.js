const express = require('express')
const app = express();
const cors = require('cors')
const mysql = require('mysql2')
const pool = require('./mysql/connection')
const port = 5000;
const routes = require('./routes');
const { checkJwt } = require('./middleware');

app.use(cors())
app.use(express.json())
app.use(routes)




app.get('/', (req,res) => {
    const sql = "SELECT * FROM users";
    pool.query(sql, (err,data) => {
        if (err) return res.json("Error");
        return res.json(data)
    })
})

app.get('/protected', (req,res) => {
    res.send('protected route')
})


app.listen(port, () => {
    console.log('listening on port 5000')
})
