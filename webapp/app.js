const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
var bodyParser = require('body-parser')



//create express app
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json()) 

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

app.get('/Manager-View', (req, res) => {
    res.render('Manager-View');
});

app.get('/inventory', (req, res) => {
    items = []
    pool
        .query('SELECT * FROM inventory ORDER BY food_id ASC;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                items.push(query_res.rows[i]);
            }
            const data = {items: items};
            res.render('inventory',data);
        });
});

app.get('/inventory-add', (req, res) => {
    res.render('inventory-add');
});

app.get('/inventory-delete', (req, res) => {
    res.render('inventory-delete');
});

app.get('/inventory-update', (req, res) => {
    res.render('inventory-update');
});

app.get('/online-order', (req,res) => {
    res.render('online-order');
});

app.post('/online-order', (req, res) => {
    var str = req.body.statement;
    console.log("post req ca1led: " + str);
    pool
    .query(str)
    .then(query_res => { });
    res.render('online-checkout');
  })






app.get('/sales-report', (req, res) => {
    items = []
    let date = new Date();
    date.setMonth(date.getMonth() - 3);
    date = date.toJSON().slice(0, 10);
    string = 'SELECT count(*) FROM order_entries WHERE base = \'Bowl\' AND protein = \'Chicken\' AND date > \'' + date + '\'' 
    string += ' UNION SELECT count(*) FROM order_entries WHERE base = \'Bowl\' AND protein = \'Beaf\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE base = \'Bowl\' AND protein = \'Steak\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE base = \'Burrito\' AND protein = \'Chicken\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE base = \'Burrito\' AND protein = \'Beaf\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE base = \'Burrito\' AND protein = \'Steak\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE chips_salsa= \'1\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE chips_queso= \'1\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE chips_guac = \'1\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE brownie = \'1\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE cookie = \'1\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE drink_16oz = \'1\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE drink_22oz = \'1\' AND date > \'' + date + '\';'

    pool
        .query(string)
        .then(query_res => {
            console.log(query_res.rowCount);
            for (let i = 0; i < query_res.rowCount; i++) {
                items.push(query_res.rows[i]);
            }
            const data = {items: items};
            res.render('sales-report',data);
        });
});

app.get('/restock-report', (req, res) => {
    items = []
    pool
        .query('SELECT food_id, food_name, current_count, ((current_count/max_count)*100) AS percentage FROM inventory ORDER BY food_id ASC;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                items.push(query_res.rows[i]);
            }
            const data = {items: items};
            res.render('restock-report',data);
        });
});

app.get('/server-view', (req,res) => {
    res.render('server-view');
});

app.post('/server-view', (req, res) => {
    var str = req.body.statement;
    console.log("post req ca1led: " + str);
    pool
    .query(str)
    .then(query_res => { });
    res.render('server-view');
  })


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

