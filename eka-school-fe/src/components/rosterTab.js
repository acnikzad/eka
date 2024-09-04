import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { ToggleButton } from "primereact/togglebutton";
import {
  fetchClassesAndStudentsByTeacher,
  fetchClasses,
} from "../slices/classReducer";
import { fetchStudents } from "../slices/studentReducer";
import "./teachersTab.scss";

const RosterTab = ({ teachers, students, classes }) => {
  const dispatch = useDispatch();
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [showMatchedOnly, setShowMatchedOnly] = useState(false);

  useEffect(() => {
    if (selectedTeachers.length > 0) {
      dispatch(fetchClassesAndStudentsByTeacher(selectedTeachers));
    } else {
      dispatch(fetchClasses());
      dispatch(fetchStudents());
    }
  }, [selectedTeachers]);

  const handleTeacherClick = (teacher) => {
    if (selectedTeachers.includes(teacher.id)) {
      setSelectedTeachers(selectedTeachers.filter((id) => id !== teacher.id));
    } else {
      setSelectedTeachers([...selectedTeachers, teacher.id]);
    }
  };

  useEffect(() => {
    if (selectedTeachers.length > 0) {
      dispatch(fetchClassesAndStudentsByTeacher(selectedTeachers));
    }
  }, [selectedTeachers, dispatch]);

  return (
    <div>
      <div className="toggle-container" style={{ marginBottom: "1rem" }}>
        <ToggleButton
          checked={showMatchedOnly}
          onChange={(e) => setShowMatchedOnly(e.value)}
          onLabel="Show Matched Only"
          offLabel="Show All"
        />
      </div>

      <div className="roster-grid">
        <div className="roster-column">
          <h2>Teachers</h2>
          {teachers.map((teacher) => {
            const matchedClass = classes.find(
              (classItem) =>
                classItem.teacher_id === teacher.id && classItem.matched
            );
            const teacherColor = matchedClass ? matchedClass.color : null;

            return (
              <Card
                key={teacher.id}
                title={teacher.name}
                className={`teacher-card ${
                  selectedTeachers.includes(teacher.id) ? "selected" : ""
                }`}
                style={{
                  backgroundColor: selectedTeachers.includes(teacher.id)
                    ? teacherColor
                    : "",
                }}
                onClick={() => handleTeacherClick(teacher)}
              >
                <p>{`ID: ${teacher.id}`}</p>
              </Card>
            );
          })}
        </div>
        <div className="roster-column">
          <h2>Classes</h2>
          {classes
            .filter((classItem) => (showMatchedOnly ? classItem.matched : true))
            .map((classItem) => (
              <Card
                key={classItem.id}
                title={classItem.name}
                className={`class-card ${
                  classItem.matched ? "matched-class" : ""
                }`}
              >
                <p>{`ID: ${classItem.id}`}</p>
                {classItem.matched && (
                  <Badge
                    value="Matched"
                    style={{ backgroundColor: classItem.color, color: "#fff" }}
                  />
                )}
              </Card>
            ))}
        </div>
        <div className="roster-column">
          <h2>Students</h2>
          {students
            .filter((student) => {
              const matchedClasses = classes.filter(
                (classItem) =>
                  classItem.matched && student.colors.includes(classItem.color)
              );
              return showMatchedOnly ? matchedClasses.length > 0 : true;
            })
            .map((student) => {
              const matchedClasses = classes.filter(
                (classItem) =>
                  classItem.matched && student.colors.includes(classItem.color)
              );
              const uniqueColors = [
                ...new Set(matchedClasses.map((classItem) => classItem.color)),
              ];

              return (
                <Card
                  key={student.id}
                  title={student.name}
                  className="student-card"
                >
                  <p>{`ID: ${student.id}`}</p>
                  {uniqueColors.length > 0 &&
                    uniqueColors.map((color, index) => (
                      <Badge
                        key={index}
                        value="In Class"
                        style={{ backgroundColor: color, color: "#fff" }}
                      />
                    ))}
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RosterTab;
