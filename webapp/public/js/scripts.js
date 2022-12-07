var menu_item_ids = new Array(24).fill(100); //27 items in inventory
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

var msg = new SpeechSynthesisUtterance();
msg.text = "Hello World";


//finding date and times
var today = new Date();
var min = String(today.getMinutes()).padStart(2, '0');
var hour =String(today.getHours()).padStart(2, '0');
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
var yyyy = today.getFullYear();

today = '\'' + mm + '/' + dd + '/' + yyyy + '\'';
order_array[14] = today;
var order_number = mm+dd+hour+min;
var customer_number = -1 ; //never same customer for first order

var cost = 0.0;
var protein_cost = 0.0;

/**
 * Keeps the customer number increasing even after page is refreshed
 * 
 * @author      Joshua Batac
 * @param       none        no parameter
 * @return      {void}      no return
 */
function customerNumberCounter() {
    let count = Number(localStorage.getItem('count')) || 0;
    customer_number = count;
    localStorage.setItem('count', count + 1);
    return;
}

/**
 * Resets stored customer number back to 0. Found in server view
 * 
 * @author      Joshua Batac
 * @param       none            no parameter
 * @return      {void}          no return  
 */
function resetCounter() { 
    localStorage.clear(); 
}

/**
 * Acts as an actionlistener for all the non protein buttons. Updates the prices as things are added and removed. Updates the inventory as well. 
 * 
 * @author      Joshua Batac
 * @param       {number} id      button id   
 * @return      {void}           no return
 */
function validate(id) {
    document.getElementById("submit").style.visibility = 'hidden';
    var added = false;
    if (document.getElementById(id).checked) {
        menu_item_ids[id] = menu_item_ids[id] - 1;
        if (id <= 12) { order_array[id] = "\'1\'"; } //any id number over 12 cost zero, no counted in array
    } else {
        menu_item_ids[id] = menu_item_ids[id]+1;
        if (id <= 12) { order_array[id] = "\'0\'"; }
    }

    cost = protein_cost;
    console.log("prot cost: " + cost);
    for (let i = 4; i <= 12; i++) { //first 12 items in invetory are the only ones w cost. After 4 is non proteins
        if (document.getElementById(i).checked) {
            added = true;
            var item_price = prices[i];
            cost = cost + item_price;
            cost = Number(cost.toFixed(2));
            console.log("added: " + item_price);
            console.log("cost in loop: " + cost);
            document.getElementById("total").textContent=  "$" + cost; //updating cost
            order_array[13] = cost;
        } 
    }

    if (!added) {
        document.getElementById("total").textContent=  "$" + cost; //updating cost
    }

}

/**
 * Acts as an actionlistener for all the non buttons. Updates the Protein choice. Updates the inventory as well. 
 * 
 * @author      Joshua Batac
 * @param       {number} id      button id   
 * @return      {void}           no return
 */
function validateProtein(id) {
    document.getElementById("submit").style.visibility = 'hidden';

    cost = cost - protein_cost;
    for (let i = 0; i < 4; i++) {
        if (document.getElementById(i).checked) {
            protein_cost = prices[i];
            cost = cost + protein_cost;
            cost = Number(cost.toFixed(2));
            document.getElementById("total").textContent=  "$" + cost; //updating cost
            order_array[13] = cost;
            break;
        }
    }
    cost = Number(cost.toFixed(2));
    console.log(cost);
    if (id < 0) {
        cost = Number(cost.toFixed(2));
        document.getElementById("total").textContent=  "$" + cost; //updating cost
        protein_cost = 0;
    }

}


/**
 * Sends Order and adds order to the pSQL database 
 * 
 * @author      Joshua Batac
 * @param       none             no parameter   
 * @return      {void}           no return
 */
function sendOrder () {

    customerNumberCounter();
    //localStorage.clear();

    
    //adding the base to the sqlStmt
    order_array[2] = "\'N/A\'"; //will stay N/A if nothing is checked
    for (let i = 13; i <= 14; i++) {
        if (document.getElementById(i).checked) {
            var str = document.getElementById(i).value;
            //console.log(str);
            menu_item_ids[i] = menu_item_ids[i] - 1; //remove from inv
            order_array[2] = "\'" + str + "\'"; //set sqlstmt arr to str
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
            order_array[3] = "\'" + str + "\'"; //set sqtmt arr to str
            break;
        }
    }


    //adding cost to sql stmt

    //checking inventory calculations
    let inventory = menu_item_ids.toString();
    console.log(inventory);


    if (!document.getElementById('same-customer').checked) { customer_number += 1;} //same customer

    //adding order and customer id to sqlstmt
    order_array[0] = order_number;
    order_array[1] = customer_number;

    //checking sqlstmt
    let psqlStatementArray = order_array.toString();

    var psqlStmt = "INSERT INTO order_entries (order_number, customer, base, protein, guacamole, queso, chips_salsa, chips_queso, chips_guac, brownie, cookie, drink_16oz, drink_22oz, cost, date) VALUES (" + psqlStatementArray + ");";
    console.log(psqlStmt);


    document.getElementById("statementID").value = psqlStmt; //updating cost
    document.getElementById("submit").style.visibility = 'visible';
    //reload page
    //location.reload();
}

/**
 * Adds item to inventory
 * 
 * @author      Asger Larsen
 * @param       none             no parameter   
 * @return      {void}           no return
 */
function addItem() {
    console.log("adding item");
    var item = document.getElementById("food_id").value;
    var name = document.getElementById("food_name").value;
    var current_count = document.getElementById("current_count").value;
    var max_count = document.getElementById("max_count").value;
    var price = document.getElementById("sell_price").value;
    var is_menu_item = document.getElementById("is_menu_item").value;
    var is_protein = document.getElementById("is_protein").value;
    
    //if nothing is checked, set to null
    if (name == "") { name = "null"; }
    if (current_count == "") { current_count = "null"; }
    if (max_count == "") { max_count = "null"; }
    if (price == "") { price = "null"; }
    if (is_menu_item == "") { is_menu_item = "null"; }
    if (is_protein == "") { is_protein = "null"; }
    psqlStmt = "INSERT INTO inventory (food_id, food_name, current_count, max_count, sell_price, is_menu_item, is_protein) VALUES (" + item + ", " + name + ", " + current_count + ", " + max_count + ", " + price + ", " + is_menu_item + ", " + is_protein + ");";

    console.log(psqlStmt);
    window.name = psqlStmt;
}

/**
 * Adds delete items in inventory
 * 
 * @author      Asger Larsen
 * @param       none             no parameter   
 * @return      {void}           no return
 */
function deleteItem() {
    var item = document.getElementById("food_id").value;
    var psqlStmt = "DELETE FROM inventory WHERE food_id = " + item + ";";
    console.log(psqlStmt);
    window.name = psqlStmt;
}

/**
 * Adds updates items in inventory
 * 
 * @author      Asger Larsen
 * @param       none             no parameter   
 * @return      {void}           no return
 */
function updateItem() {
    var item = document.getElementById("food_id").value;
    var name = document.getElementById("food_name").value;
    var current_count = document.getElementById("current_count").value;
    var max_count = document.getElementById("max_count").value;
    var price = document.getElementById("sell_price").value;
    var is_menu_item = document.getElementById("is_menu_item").value;
    var is_protein = document.getElementById("is_protein").value;
    
    //if nothing is entered, don't update that field
    var psqlStmt = "UPDATE inventory SET ";
    if (name != "") { psqlStmt += "food_name = \'" + name + "\', "; }
    if (current_count != "") { psqlStmt += "current_count = " + current_count + ", "; }
    if (max_count != "") { psqlStmt += "max_count = " + max_count + ", "; }
    if (price != "") { psqlStmt += "sell_price = " + price + ", "; }
    if (is_menu_item != "") { psqlStmt += "is_menu_item = " + is_menu_item + ", "; }
    if (is_protein != "") { psqlStmt += "is_protein = " + is_protein + ", "; }
    psqlStmt = psqlStmt.slice(0, -2); //remove last comma
    console.log(psqlStmt);
    window.name = psqlStmt;
}

// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.031 }; //30.61255586916428, -96.34124565996838 - cabo 
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }
  
  window.initMap = initMap;

  function pressed(id) {
    msg.text = id;
    window.speechSynthesis.speak(msg);
  }

  function pressedTotal() {
    msg.text = "Your total is: " + document.getElementById("total").textContent;
    window.speechSynthesis.speak(msg);
  }


