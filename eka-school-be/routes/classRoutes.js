const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

router.get("/", classController.getAllClasses);
router.get("/:id", classController.getClassById);
router.post("/", classController.createClass);
router.get("/:id/students", classController.getStudentsByClass);

module.exports = router;
