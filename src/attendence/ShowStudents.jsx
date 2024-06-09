import React, { useState, useEffect } from "react";
import axios from "axios";

function ShowStudents({ updateData }) {
  const [teachers, setTeachers] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  async function fetchFaculties() {
    try {
      const response = await axios.get("http://localhost:3000/getFaculty");
      if (response.status === 200) {
        setTeachers(response.data);
      } else {
        console.log("Failed to fetch faculties");
      }
    } catch (error) {
      console.error("Error fetching faculties", error);
    }
  }

  async function fetchStudents(faculty) {
    try {
      const response = await axios.get(
        `http://localhost:3000/getStudent?faculty=${faculty}`
      );
      if (response.status === 200) {
        setStudents(response.data);
        
        const initialAttendance = {};
        response.data.forEach((student) => {
          initialAttendance[student.name] = "A";
        });
        setAttendance(initialAttendance);
      } else {
        console.log("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students", error);
    }
  }

  useEffect(() => {
    fetchFaculties();
  }, [updateData]);

  useEffect(() => {
    if (selectedFaculty) {
      fetchStudents(selectedFaculty);
    }
  }, [selectedFaculty]);

  function toggleAttendance(studentName) {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentName]: prevAttendance[studentName] === "A" ? "P" : "A",
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const studentData = students.map(student => ({
      studentId: student._id,
      studentName: student.name,
      status: attendance[student.name]
    }));

    const dataToSend = {
      date: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      faculty: selectedFaculty,
      attendance: studentData
    };

    try {
      const response = await axios.post("http://localhost:3000/saveAttendance", dataToSend);
      if (response.status === 200) {
        console.log("Attendance saved successfully");
      } else {
        console.log("Failed to save attendance");
      }
    } catch (error) {
      console.log("Error saving attendance", error);
    }
  };

  return (
    <>
      <div className="wrapper mx-auto bg-white rounded-lg max-w-lg p-6">
        <form action="" onSubmit={handleSubmit}>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="faculty"
        >
          Select faculty
        </label>
        <select
          id="faculty"
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm"
        >
          <option value="" disabled>
            Select faculty
          </option>
          {teachers.map((teacher) => (
            <option key={teacher.name} value={teacher.name}>
              {teacher.name}
            </option>
          ))}
        </select>

        {students.length > 0 && (
          <div className="students-list">
            <ul>
              {students.map((student) => (
                <li
                  key={student.name}
                  className="border border-rounded flex justify-between "
                >
                  <span className="ml-3">{student.name}</span>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleAttendance(student.name);
                    }}
                    className={`text-center text-white px-3 mr-5 rounded-md ${
                      attendance[student.name] === "P"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {attendance[student.name]}
                  </a>
                </li>
              ))}
            </ul>
            <button className="bg-green-600 text-white mt-4  flex justify-center m-auto items-center py-2 px-4 text-sm font-medium rounded-md" type="submit">Submit</button>
          </div>
        )}
        </form>
      </div>
    </>
  );
}

export default ShowStudents;

