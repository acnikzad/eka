const { Pool } = require("pg");
const pool = new Pool();

const Class = {
  async findAll() {
    const { rows } = await pool.query("SELECT * FROM classes");
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query("SELECT * FROM classes WHERE id = $1", [
      id,
    ]);
    return rows[0];
  },

  async findStudents(id) {
    const { rows } = await pool.query(
      `SELECT students.* FROM students
       JOIN class_students ON students.id = class_students.student_id
       WHERE class_students.class_id = $1`,
      [id]
    );
    return rows;
  },

  async create(name, teacherId) {
    const { rows } = await pool.query(
      "INSERT INTO classes (name, teacher_id) VALUES ($1, $2) RETURNING *",
      [name, teacherId]
    );
    return rows[0];
  },

  async update(id, name, teacherId) {
    const { rows } = await pool.query(
      "UPDATE classes SET name = $1, teacher_id = $2 WHERE id = $3 RETURNING *",
      [name, teacherId, id]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      "DELETE FROM classes WHERE id = $1 RETURNING *",
      [id]
    );
    return rows[0];
  },
};

module.exports = Class;
