const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

// .env file configuration
require("dotenv").config();

// Express body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration for EJS Templating engine
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

// Routes
app.use("/", require("./routes/index.routes"));
app.use("/api/items", require("./routes/items.routes"));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
