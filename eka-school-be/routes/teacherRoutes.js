const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const classController = require("../controllers/classController");

router.get("/", teacherController.getAllTeachers);
router.get(
  "/classes-and-students",
  classController.getClassesAndStudentsByTeacher
);
router.post("/", teacherController.createTeacher);

module.exports = router;
