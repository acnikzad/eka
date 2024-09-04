require("dotenv").config();
const pool = require("./db");

const f_names = [
  "Adam",
  "Alex",
  "Aaron",
  "Ben",
  "Carl",
  "Dan",
  "David",
  "Edward",
  "Fred",
  "Frank",
  "George",
  "Hal",
  "Hank",
  "Ike",
  "John",
  "Jack",
  "Joe",
  "Larry",
  "Monte",
  "Matthew",
  "Mark",
  "Nathan",
  "Otto",
  "Paul",
  "Peter",
  "Roger",
  "Steve",
  "Thomas",
  "Tim",
  "Ty",
  "Alejandro",
  "Linh",
  "Aisha",
  "Raj",
  "Chin",
  "Maria",
  "Kofi",
  "Nadia",
  "Elena",
  "Yuki",
  "Fatima",
  "Miguel",
  "Hiroshi",
  "Anika",
  "Sofia",
  "Leila",
  "Jin",
  "Santiago",
  "Priya",
  "Omar",
  "Michael",
  "Stacey",
  "Michelle",
  "Trevor",
  "Sean",
  "Annie",
  "Ben",
  "Steven",
  "Eric",
  "Johnathon",
  "William",
  "Karen",
  "Victoria",
];

const l_names = [
  "Donnelly",
  "Elrod",
  "Foust",
  "Griswold",
  "Simmons",
  "Milam",
  "Lance",
  "Peacock",
  "Byrne",
  "Yeager",
  "Barone",
  "Worden",
  "Wylie",
  "Cantu",
  "Bello",
  "Whatley",
  "George",
  "Bland",
  "Larue",
  "Ceballos",
  "Ritter",
  "Meeks",
  "Cho",
  "Artis",
  "Suggs",
  "Rader",
  "Ramsey",
  "Randolph",
  "Benavides",
  "Culbertson",
  "García",
  "Nguyen",
  "Ahmed",
  "Patel",
  "Lee",
  "Rodríguez",
  "Mensah",
  "Ivanova",
  "Petrova",
  "Yamamoto",
  "Khan",
  "Martínez",
  "Tanaka",
  "Choudhury",
  "Kovács",
  "Haddad",
  "Li",
  "Fernández",
  "Mehta",
  "Saif",
  "Stevenson",
  "Williams",
  "Harrington",
  "Erickson",
  "Anderson",
  "Cason",
  "Ferrua",
];

const course_prefix = [
  "Bus",
  "Fin",
  "Econ",
  "Acct",
  "Art",
  "Calc",
  "Math",
  "Geog",
  "Geol",
  "Ast",
];
const course_suffix = [
  "100",
  "101",
  "102",
  "200",
  "201",
  "202",
  "300",
  "301",
  "302",
  "400",
  "401",
  "402",
];

const colors = [
  "#ffadad",
  "#ffd6a5",
  "#fdffb6",
  "#caffbf",
  "#9bf6ff",
  "#a0c4ff",
  "#bdb2ff",
  "#ffc6ff",
];

async function seedDatabase() {
  try {
    await pool.query("DELETE FROM class_students");
    await pool.query("DELETE FROM classes");
    await pool.query("DELETE FROM students");
    await pool.query("DELETE FROM teachers");

    const teachers = [];
    for (let i = 0; i < 10; i++) {
      const firstName = f_names[Math.floor(Math.random() * f_names.length)];
      const lastName = l_names[Math.floor(Math.random() * l_names.length)];
      const name = `${firstName} ${lastName}`;
      const color = colors[i % colors.length];
      const result = await pool.query(
        "INSERT INTO teachers (name, color) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING id, color",
        [name, color]
      );
      teachers.push({
        id: result.rows[0]?.id || i + 1,
        color: result.rows[0]?.color || color,
      });
    }

    const classes = [];
    for (let i = 0; i < 20; i++) {
      const prefix =
        course_prefix[Math.floor(Math.random() * course_prefix.length)];
      const suffix =
        course_suffix[Math.floor(Math.random() * course_suffix.length)];
      const name = `${prefix}${suffix}`;
      const teacher = teachers[Math.floor(Math.random() * teachers.length)];
      const result = await pool.query(
        "INSERT INTO classes (name, teacher_id, color) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING id",
        [name, teacher.id, teacher.color]
      );
      classes.push({ id: result.rows[0]?.id || i + 1, color: teacher.color });
    }

    for (let i = 0; i < 300; i++) {
      const firstName = f_names[Math.floor(Math.random() * f_names.length)];
      const lastName = l_names[Math.floor(Math.random() * l_names.length)];
      const name = `${firstName} ${lastName}`;
      const result = await pool.query(
        "INSERT INTO students (name) VALUES ($1) ON CONFLICT DO NOTHING RETURNING id",
        [name]
      );
      const student_id = result.rows[0]?.id || i + 1;

      const studentColors = [];
      for (let j = 0; j < 3; j++) {
        const randomClass = classes[Math.floor(Math.random() * classes.length)];
        studentColors.push(randomClass.color);

        await pool.query(
          "INSERT INTO class_students (class_id, student_id, grade) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
          [randomClass.id, student_id, Math.floor(Math.random() * 101)]
        );
      }

      await pool.query("UPDATE students SET colors = $1 WHERE id = $2", [
        studentColors,
        student_id,
      ]);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    pool.end();
  }
}

seedDatabase();
