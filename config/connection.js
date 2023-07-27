// Stating requirements
const { connect, connection } = require("mongoose");

// Making connection to mongoose
connect("mongodb://127.0.0.1:27017/social-network-api");

module.exports = connection;
