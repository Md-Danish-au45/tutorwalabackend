const express = require("express");
const {
  handleConsultationForm,
} = require("../controller/consultationController");
const router = express.Router();

router.post("/", handleConsultationForm);

module.exports = router;
