import express from 'express';
const app = express();
import cors from 'cors';
import mysql from 'mysql2/promise'
import pool from './mysql/connection.js'
const port = 5000;
import routes from './routes/index.js'

app.use(cors())
app.use(express.json())
app.use(routes)


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
//   });

app.get('/', (req,res) => {
    const sql = "SELECT * FROM users";
    pool.query(sql, (err,data) => {
        if (err) return res.json("Error");
        return res.json(data)
    })
})



app.listen(port, () => {
    console.log('listening on port 5000')
})
