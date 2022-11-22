var menu_item_ids = new Array(25).fill(100); //27 items in inventory
var order_array = new Array(15).fill('\'0\''); //used for psql stmt
var prices = 
[ 
    7.29, //chicken
    8.29, //steak
    8.19, //beef
    7.29, //vegetables
       2, //guac
       2, //queso
    2.19, //chips_salsa
    3.64, //chips_queso
    3.69, //chips_guac
    1.99, //brownie
    1.99, //cookie
    2.25, //16oz
    2.75  //22oz  
];

//finding date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = '\'' + mm + '/' + dd + '/' + yyyy + '\'';

order_array[14] = today;



var order_number = 0;
var customer_number = -1; //never same customer for first order
var cost = 0.0;


function validate(id) {
    if (document.getElementById(id).checked) {
        menu_item_ids[id] = menu_item_ids[id] - 1;
        if (id <= 12) { order_array[id] = '1'; } //any id number over 12 cost zero, no counted in array
    } else {
        menu_item_ids[id] = menu_item_ids[id]+1;
        if (id <= 12) { order_array[id] = '0'; }
    }
    cost = 0;

    for (let i = 0; i <= 5; i++) { //first 12 items in invetory are the only ones w cost
        if (document.getElementById(i).checked) {
            var item_price = prices[i];
            cost = cost + item_price;
            document.getElementById("total").value = cost;

        }
    }
}

function sendOrder () {

    //adding the base to the sqlStmt
    order_array[2] = "\'N/A\'"; //will stay N/A if nothing is checked
    for (let i = 13; i <= 14; i++) {
        if (document.getElementById(i).checked) {
            var str = document.getElementById(i).value;
            //console.log(str);
            menu_item_ids[i] = menu_item_ids[i] - 1; //remove from inv
            order_array[2] = str; //set sqlstmt arr to str
            break;
        }
    }

    //adding the protein to the sqlStmt
    order_array[3] = "\'N/A\'"; //will stay N/A if nothing is checked
    for (let i = 0; i <= 3; i++) {
        if (document.getElementById(i).checked) {
            var str = document.getElementById(i).value;
            //console.log(str);
            menu_item_ids[i] = menu_item_ids[i] - 1; //remove from inv
            order_array[3] = str; //set sqtmt arr to str
            break;
        }
    }

    //calculating cost

    for (let i = 0; i <= 12; i++) { //first 12 items in invetory are the only ones w cost
        console.log(i);
        if (document.getElementById(i).checked) {
            var item_price = prices[i];
            cost = cost + item_price;
            console.log(item_price);
            console.log("current cost: " + cost);
        }
    }

    //adding cost to sql stmt
    order_array[13] = cost;

    //checking inventory calculations
    let inventory = menu_item_ids.toString();
    console.log(inventory);


    if (!document.getElementById('same-customer').checked) { customer_number += 1;} //same customer

    //adding order and customer id to sqlstmt
    order_array[0] = order_number;
    order_array[1] = customer_number;

    //checking sqlstmt
    let psqlStatementArray = order_array.toString();

    var psqlStmt = "INSERT INTO inventory (food_id, food_name, current_count, max_count, sell_price, is_menu_item) VALUES (" + psqlStatementArray;
    console.log(psqlStmt);

    //reload page
    location.reload();
}
