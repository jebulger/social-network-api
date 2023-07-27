// Stating requirements, and importing api routes from api directory
const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

module.exports = router;
