import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../slices/teacherReducer";
import { fetchClasses } from "../slices/classReducer";
import { fetchStudents } from "../slices/studentReducer";
import RosterTab from "../components/rosterTab";

const EkaSchoolContainer = () => {
  const dispatch = useDispatch();

  const teachers = useSelector((state) => state.teachers.teachers);
  const classes = useSelector((state) => state.classes.classes);
  const students = useSelector((state) => state.students.students);
  const loadingTeachers = useSelector((state) => state.teachers.loading);
  const errorTeachers = useSelector((state) => state.teachers.error);

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchClasses());
    dispatch(fetchStudents());
  }, []);

  if (loadingTeachers) return <p>Loading...</p>;
  if (errorTeachers) return <p>Error: {errorTeachers}</p>;

  return (
    <RosterTab teachers={teachers} classes={classes} students={students} />
  );
};

export default EkaSchoolContainer;
