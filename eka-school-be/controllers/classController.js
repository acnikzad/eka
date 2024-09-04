const pool = require("../db");

const classController = {
  async getAllClasses(req, res) {
    try {
      const { rows } = await pool.query("SELECT * FROM classes");
      res.json(rows);
    } catch (error) {
      console.error("Error fetching classes:", error.message);
      res.status(500).json({ error: error.message });
    }
  },

  async getClassesAndStudentsByTeacher(req, res) {
    const { ids } = req.query;
    if (!ids) {
      return res.status(400).json({ error: "No teacher IDs provided" });
    }
    const teacherIds = ids.split(",").map((id) => parseInt(id));

    try {
      const { rows: allClasses } = await pool.query("SELECT * FROM classes");
      const { rows: matchedClasses } = await pool.query(
        "SELECT * FROM classes WHERE teacher_id = ANY($1::int[])",
        [teacherIds]
      );

      const { rows: allStudents } = await pool.query("SELECT * FROM students");
      const matchedClassIds = matchedClasses.map((cls) => cls.id);
      const { rows: matchedStudents } = await pool.query(
        "SELECT * FROM students s INNER JOIN class_students cs ON s.id = cs.student_id WHERE cs.class_id = ANY($1::int[])",
        [matchedClassIds]
      );

      const classResponse = allClasses.map((classItem) => {
        const isMatched = matchedClasses.some(
          (matchedClass) => matchedClass.id === classItem.id
        );
        return {
          ...classItem,
          matched: isMatched,
        };
      });

      const studentResponse = allStudents.map((student) => {
        const isMatched = matchedStudents.some(
          (matchedStudent) => matchedStudent.id === student.id
        );
        return {
          ...student,
          matched: isMatched,
        };
      });

      res.json({
        classes: classResponse,
        students: studentResponse,
      });
    } catch (error) {
      console.error("Error fetching classes and students:", error.message);
      res.status(500).json({ error: error.message });
    }
  },

  async getClassById(req, res) {
    try {
      const { rows } = await pool.query("SELECT * FROM classes WHERE id = $1", [
        req.params.id,
      ]);
      if (rows.length) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ error: "Class not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getStudentsByClass(req, res) {
    try {
      const { rows } = await pool.query(
        `SELECT students.* FROM students
         JOIN class_students ON students.id = class_students.student_id
         WHERE class_students.class_id = $1`,
        [req.params.id]
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createClass(req, res) {
    try {
      const { name, teacherId } = req.body;
      const { rows } = await pool.query(
        "INSERT INTO classes (name, teacher_id) VALUES ($1, $2) RETURNING *",
        [name, teacherId]
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = classController;
