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

app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.path);
    console.log('Headers:', req.headers);
    next();
  });

app.listen(port, () => {
    console.log('listening on port 5000')
})
