const express = require("express");
const { addStudent, getStudents } = require("../controller/studentController");
const router = express.Router();

router.post("/student", addStudent);
router.get("/students", getStudents);

module.exports = router;
