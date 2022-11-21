var menu_item_ids = new Array(27).fill(100); //27 items in inventory
var order_array = new Array(15).fill('\'0\''); //used for psql stmt
var prices = [ 7.29,
    8.29,
    8.19,
    7.29,
       2,
       2,
    2.19,
    3.64,
    3.69,
    1.99,
    1.99,
    2.25,
    2.75];

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
        if (id < 12) { order_array[id] = '1'; } //any id number over 12 cost zero, no counted in array
    } else {
        menu_item_ids[id] = menu_item_ids[id]+1;
        if (id < 12) { order_array[id] = '0'; }
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
        var item_cost = document.getElementById(0).cost;
        console.log(item_cost);
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
    console.log(psqlStatementArray);

    //reload page
    location.reload();
}
