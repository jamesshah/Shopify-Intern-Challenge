const express = require("express");
const router = express.Router();
const { pool } = require("../queries");

/**
 * @public
 * @description Get all the items present in the inventory
 * @route GET /api/items/
 */
router.get("/", async (req, res) => {
  try {
    const allItems = await pool.query(
      "SELECT * FROM items WHERE deleted = false"
    );
    res.json(allItems.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server Error!",
    });
  }
});

/**
 * @public
 * @description Add an item to the inventory
 * @route POST /api/items/
 */
router.post("/", async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    const newItem = await pool.query(
      "INSERT INTO items(name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, price, quantity]
    );
    res.json(newItem.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server Error!",
    });
  }
});

/**
 * @public
 * @description Delete an item using the id
 * @route DELETE /api/items/
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteItem = await pool.query(
      "UPDATE items SET deleted = true WHERE id = $1",
      [id]
    );

    res.json("Item deleted sucessfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server Error!",
    });
  }
});

module.exports = router;
