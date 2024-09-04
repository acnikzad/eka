CREATE TABLE IF NOT EXISTS teachers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(7)
);

CREATE TABLE IF NOT EXISTS classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    teacher_id INTEGER REFERENCES teachers(id),
    color VARCHAR(7)
);

CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    colors VARCHAR[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS class_students (
    class_id INTEGER REFERENCES classes(id),
    student_id INTEGER REFERENCES students(id),
    grade INTEGER,
    PRIMARY KEY (class_id, student_id)
);