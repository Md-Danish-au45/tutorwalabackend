const Student = require("../models/Student");

// POST - Add Student
const addStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ error: "Error saving student", details: error });
  }
};

// GET - Get All Students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Error fetching students" });
  }
};

module.exports = {
  addStudent,
  getStudents,
};
