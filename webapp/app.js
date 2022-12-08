const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
var bodyParser = require('body-parser')



//create express app
const app = express();
const port = 3000;
const session = require('express-session');


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

app.get('/locations', (req, res) => {
    res.render('locations');
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

app.get('/login2', (req,res) => {
    res.render('login2');
});

app.get('/successfulLogin', (req,res) => {
    res.render('successfulLogin');
});
app.post('/online-order', (req, res) => {
    var str = req.body;
    arrayBools = new Array();
    arrayBools.push(str.form_0);
    arrayBools.push(str.form_1);
    arrayBools.push(str.form_2);
    arrayBools.push(str.form_3);
    arrayBools.push(str.form_4);
    arrayBools.push(str.form_5);
    arrayBools.push(str.form_6);
    arrayBools.push(str.form_7);
    arrayBools.push(str.form_8);
    arrayBools.push(str.form_9);
    arrayBools.push(str.form_10);
    arrayBools.push(str.form_11);
    arrayBools.push(str.form_12);
    arrayBools.push(str.form_13);
    arrayBools.push(str.form_14);
    arrayBools.push(str.form_15);
    arrayBools.push(str.form_16);
    arrayBools.push(str.form_17);
    arrayBools.push(str.form_18);
    arrayBools.push(str.form_19);
    arrayBools.push(str.form_20);
    arrayBools.push(str.form_21);
    arrayBools.push(str.form_22);
    arrayBools.push(str.form_23);
    console.log(arrayBools);

    var poolQuery = str.statementID;
    console.log(poolQuery +" ");


    for (let i = 0; i < arrayBools.length; i++) {
        if (arrayBools[i] == 'true') {
            var poolAdd = "UPDATE inventory SET current_count = current_count - 1 WHERE food_id = " + i + "; ";
            poolQuery = poolQuery + poolAdd;
            console.log(poolQuery);
        }
    }


    pool
    .query(poolQuery)
    .then(query_res => { });
    res.render('online-checkout');

  });






app.get('/sales-report', (req, res) => {
    items = []
    let date = new Date();
    date.setMonth(date.getMonth() - 3);
    date = date.toJSON().slice(0, 10);
    console.log(date);
    string = 'SELECT count(*) FROM order_entries WHERE base = \'Bowl\' AND protein = \'Chicken\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE base = \'Bowl\' AND protein = \'Beaf\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE base = \'Bowl\' AND protein = \'Steak\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE base = \'Burrito\' AND protein = \'Chicken\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE base = \'Burrito\' AND protein = \'Beaf\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE base = \'Burrito\' AND protein = \'Steak\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE chips_queso= \'1\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE chips_guac = \'1\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE brownie = \'1\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE cookie = \'1\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE drink_16oz = \'1\' AND date > \'' + date + '\''
    string += ' UNION SELECT count(*) FROM order_entries WHERE drink_22oz = \'1\' AND date > \'' + date + '\';'

    console.log(string);

    pool
        .query(string)
        .then(query_res => {
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
    var str = req.body;
    arrayBools = new Array();
    arrayBools.push(str.form_0);
    arrayBools.push(str.form_1);
    arrayBools.push(str.form_2);
    arrayBools.push(str.form_3);
    arrayBools.push(str.form_4);
    arrayBools.push(str.form_5);
    arrayBools.push(str.form_6);
    arrayBools.push(str.form_7);
    arrayBools.push(str.form_8);
    arrayBools.push(str.form_9);
    arrayBools.push(str.form_10);
    arrayBools.push(str.form_11);
    arrayBools.push(str.form_12);
    arrayBools.push(str.form_13);
    arrayBools.push(str.form_14);
    arrayBools.push(str.form_15);
    arrayBools.push(str.form_16);
    arrayBools.push(str.form_17);
    arrayBools.push(str.form_18);
    arrayBools.push(str.form_19);
    arrayBools.push(str.form_20);
    arrayBools.push(str.form_21);
    arrayBools.push(str.form_22);
    arrayBools.push(str.form_23);
    console.log(arrayBools);

    var poolQuery = str.statementID;
    console.log(poolQuery +" ");


    for (let i = 0; i < arrayBools.length; i++) {
        if (arrayBools[i] == 'true') {
            var poolAdd = "UPDATE inventory SET current_count = current_count - 1 WHERE food_id = " + i + "; ";
            poolQuery = poolQuery + poolAdd;
            console.log(poolQuery);
        }
    }


    pool
    .query(poolQuery)
    .then(query_res => { });
    res.render('server-view');

  });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
function handleCallbackResponse(response){
  console.log("Token")
}

const passport = require('passport');
var userProfile;
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//for hosted website const GOOGLE_CLIENT_ID = '632511847355-7tqapbka72drbect6f8m38ic3m9c509r.apps.googleusercontent.com';
const GOOGLE_CLIENT_ID = '632511847355-4vcs0q8kqi6tco54jf814fiodnrj9qho.apps.googleusercontent.com';
//for hosted website const GOOGLE_CLIENT_SECRET = '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';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    // callbackURL: "https://cabogrillmsc.onrender.com/auth/google/callback"
    callbackURL: "https://cabogrillmsc.onrender.com/auth/google/callback"

  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/successfulLogin') 
  });