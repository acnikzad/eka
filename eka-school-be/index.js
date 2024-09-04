const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:8080",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const classRoutes = require("./routes/classRoutes");

app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/classes", classRoutes);

app.get("/", (req, res) => {
  res.send("EKA School Backend");
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
