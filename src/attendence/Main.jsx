import React from "react";
import StudentForm from "./StudentForm.jsx";
import Faculty from "./Faculty.jsx";
import FacultyList from "./FacultyList.jsx";
import ShowStudents from "./ShowStudents.jsx";
import "../index.css";
import "./attendance.css";

function Main() {
  return (
    <>
      <StudentForm />
      <Faculty />
      <FacultyList />
      <ShowStudents />
    </>
  );
}

export default Main;
