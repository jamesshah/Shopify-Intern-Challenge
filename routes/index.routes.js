const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //   res.json({
  //     message: "Inventory management backend with Express.js and PostgreSQL",
  //   });
  res.render("index");
});

module.exports = router;
