const express = require("express");
const app = express.Router();
const db = require("../db");

app.get("/getInventory", async (req, res) => {
    try {
        const todo = await db.query("SELECT * FROM inventory ORDER BY food_id ASC");

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//insert an item into the inventory
app.post("/addInventory", async (req, res) => {
    try {
        const { food_id, food_name, current_count, max_count, sell_price, is_menu_item, is_protein } = req.body;
        const newInventory = await db.query(
            "INSERT INTO inventory (food_id, food_name, current_count, max_count, sell_price, is_menu_item, is_protein) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [itemid, itemname, itemprice, itemquantity]
        );

        res.json(newInventory.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//delete an item from the inventory
app.delete("/deleteInventory/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteInventory = await db.query(
            "DELETE FROM inventory WHERE food_id = $1",
            [id]
        );

        res.json("Inventory was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});