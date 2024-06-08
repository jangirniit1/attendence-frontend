import React, { useState } from "react";
import StudentForm from "./StudentForm.jsx";
import Faculty from "./Faculty.jsx";
import FacultyList from "./FacultyList.jsx";
import ShowStudents from "./ShowStudents.jsx";
import "../index.css";
import "./attendance.css";

function Main() {
  const [updateData, setUpdateData] = useState(false);

  const handleUpdate = () => {
    setUpdateData(!updateData);
  };
  return (
    <>
      <StudentForm studentSaved={handleUpdate} updateData={updateData} />
      <Faculty facultySaved={handleUpdate} />
      <FacultyList updateData={updateData} facultyUpdated={handleUpdate} />
      <ShowStudents updateData={updateData} />
    </>
  );
}

export default Main;
