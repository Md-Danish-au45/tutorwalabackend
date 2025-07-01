// routes/contactRoutes.js
const express = require("express");
const { sendContactForm } = require("../controller/contactController");
const router = express.Router();

router.post("/contact", sendContactForm);

module.exports = router;
