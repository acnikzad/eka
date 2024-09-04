const { Pool } = require("pg");
const pool = new Pool();

const Student = {
  async findAll() {
    const { rows } = await pool.query("SELECT * FROM students");
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query("SELECT * FROM students WHERE id = $1", [
      id,
    ]);
    return rows[0];
  },

  async findByClass(classId) {
    const { rows } = await pool.query(
      `SELECT students.* FROM students
       JOIN class_students ON students.id = class_students.student_id
       WHERE class_students.class_id = $1`,
      [classId]
    );
    return rows;
  },

  async create(name) {
    const { rows } = await pool.query(
      "INSERT INTO students (name) VALUES ($1) RETURNING *",
      [name]
    );
    return rows[0];
  },

  async update(id, name) {
    const { rows } = await pool.query(
      "UPDATE students SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id]
    );
    return rows[0];
  },
};

module.exports = Student;
