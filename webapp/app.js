const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
//create express app
const app = express();
const port = 3000;
const session = require('express-session');

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

app.get('/login2', (req,res) => {
    res.render('login2');
});

app.get('/successfulLogin', (req,res) => {
    res.render('successfulLogin');
});

app.get('/server-view', (req,res) => {
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
const GOOGLE_CLIENT_ID = '632511847355-6m02srevbfvp7l7kt7fdekgcp1es90r9.apps.googleusercontent.com';
//for hosted website const GOOGLE_CLIENT_SECRET = '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';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    // callbackURL: "https://cabogrillmsc.onrender.com/auth/google/callback"
    callbackURL: "http://localhost:3000/auth/google/callback"

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