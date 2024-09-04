const pool = require("../db");

const Teacher = {
  async findAll() {
    const { rows } = await pool.query("SELECT * FROM teachers");
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query("SELECT * FROM teachers WHERE id = $1", [
      id,
    ]);
    return rows[0];
  },

  async findClasses(id) {
    const { rows } = await pool.query(
      `SELECT classes.* FROM classes WHERE classes.teacher_id = $1`,
      [id]
    );
    return rows;
  },

  async create(name) {
    const { rows } = await pool.query(
      "INSERT INTO teachers (name) VALUES ($1) RETURNING *",
      [name]
    );
    return rows[0];
  },

  async update(id, name) {
    const { rows } = await pool.query(
      "UPDATE teachers SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      "DELETE FROM teachers WHERE id = $1 RETURNING *",
      [id]
    );
    return rows[0];
  },
};

module.exports = Teacher;
