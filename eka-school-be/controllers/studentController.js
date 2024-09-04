const pool = require("../db");

const studentController = {
  async getAllStudents(req, res) {
    try {
      const { rows } = await pool.query("SELECT * FROM students");
      res.json(rows);
    } catch (error) {
      console.error("Error fetching students:", error.message);
      res.status(500).json({ error: error.message });
    }
  },

  async getStudentById(req, res) {
    try {
      const student = await Student.findById(req.params.id);
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getStudentsByClass(req, res) {
    try {
      const students = await Student.findByClass(req.params.classId);
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createStudent(req, res) {
    try {
      const { name } = req.body;
      const newStudent = await Student.create(name);
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateStudent(req, res) {
    try {
      const { name } = req.body;
      const updatedStudent = await Student.update(req.params.id, name);
      res.json(updatedStudent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteStudent(req, res) {
    try {
      await Student.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = studentController;
