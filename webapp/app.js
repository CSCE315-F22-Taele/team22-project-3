const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

//create express app
const app = express();
const port = 3000;

//create pool
const pool = new Pool ({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

//exports.pool = pool;

//add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

//static files
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'));
app.use('/js',express.static(__dirname+'public/js'));



app.set("view engine","ejs");

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/locations', (req, res) => {
    res.render('locations');
});

app.get('/Manager-View', (req, res) => {
    items = []
    pool
        .query('SELECT * FROM inventory ORDER BY food_id ASC;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                items.push(query_res.rows[i]);
            }
            const data = {items: items};
            console.log(items);
            res.render('Manager-View',data);
        });
});

app.get('/online-order', (req,res) => {
    res.render('online-order');
});

app.get('/server-view', (req,res) => {
    res.render('server-view');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

