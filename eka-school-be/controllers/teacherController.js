const pool = require("../db");

const teacherController = {
  async getAllTeachers(req, res) {
    try {
      const { rows } = await pool.query("SELECT * FROM teachers");
      res.json(rows);
    } catch (error) {
      console.error("Error fetching teachers:", error.message);
      res.status(500).json({ error: error.message });
    }
  },

  async getTeacherById(req, res) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM teachers WHERE id = $1",
        [req.params.id]
      );
      res.json(rows[0]);
    } catch (error) {
      console.error("Error fetching teacher by ID:", error.message);
      res.status(500).json({ error: error.message });
    }
  },

  async getClassesByTeacher(req, res) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM classes WHERE teacher_id = $1",
        [req.params.id]
      );
      res.json(rows);
    } catch (error) {
      console.error("Error fetching classes by teacher:", error.message);
      res.status(500).json({ error: error.message });
    }
  },

  async createTeacher(req, res) {
    try {
      const { name } = req.body;
      const result = await pool.query(
        "INSERT INTO teachers (name) VALUES ($1) RETURNING *",
        [name]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error creating teacher:", error.message);
      res.status(500).json({ error: error.message });
    }
  },

  async updateTeacher(req, res) {
    try {
      const { name } = req.body;
      const result = await pool.query(
        "UPDATE teachers SET name = $1 WHERE id = $2 RETURNING *",
        [name, req.params.id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error updating teacher:", error.message);
      res.status(500).json({ error: error.message });
    }
  },

  async deleteTeacher(req, res) {
    try {
      await pool.query("DELETE FROM teachers WHERE id = $1", [req.params.id]);
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting teacher:", error.message);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = teacherController;
