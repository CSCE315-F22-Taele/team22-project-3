const { Pool } = require('../pg');


const pool = new Pool ({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});



var menu_item_ids = new Array(27).fill(100); //27 items in inventory
var order_array = new Array(15).fill('0');

var order_number = 0;
var customer_number = 0; //never same customer for first order

function validate(id) {
    if (document.getElementById(id).checked) {
        menu_item_ids[id] = menu_item_ids[id] - 1;
        order_array[id] = 1;
    } else {
        menu_item_ids[id] = menu_item_ids[id]+1;
        order_array[id] = 0;


    }
}

function sendOrder () {
    let inventory = menu_item_ids.toString();
    console.log(inventory);

    if (!document.getElementById('same-customer').checked) { customer_number += 1;}

    order_array[0] = order_number;
    order_array[1] = customer_number;

    let psqlStatementArray = order_array.toString();
    console.log(psqlStatementArray);

    location.reload();
}
