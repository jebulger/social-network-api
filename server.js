// Stating requirements and importing routes
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// Declaring the port
const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Starting the server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
});
