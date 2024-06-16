import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentForm({ studentSaved, updateData }) {
  // const [name, setName] = useState("");
  // const [aadhaar, setAadhaar] = useState("");
  const [studentsData, setStudentsData] = useState([{ id: Date.now(), name: "", aadharCard: "" }]);
  const [faculty, setFaculty] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function fetchFaculties() {
      try {
        const response = await axios.get("http://localhost:3000/getFaculty");
        setFaculties(response.data);
      } catch (error) {
        console.log("error");
      }
    }
    fetchFaculties();
  }, [updateData]);

  async function handleSubmit(e) {
    e.preventDefault();
    const studentData = { students: studentsData, faculty };
    try {
      const response = await axios.post(
        "http://localhost:3000/saveStudent",
        studentData
      );
      if (response.status === 200) {
        console.log({ Message: "Student Saved" });
        // setName("");
        // setAadhaar("");
        setStudentsData([{ id: Date.now(), name: "", aadharCard: "" }]);
        setFaculty("");
        setMessage("Student Saved Successfully");
        studentSaved();
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log("error");
    }
  }
  const handleAddStudent = () => {
    setStudentsData([...studentsData, { id: Date.now(), name: "", aadharCard: "" }]);
  };
  const handleChange = (index, field, value) => {
    const newStudentsData = [...studentsData];
    newStudentsData[index][field] = value;
    setStudentsData(newStudentsData);
  };

  return (
    <div className="wrapper max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Student</h1>
      <form onSubmit={handleSubmit}>
      {studentsData.map((student, index) => (
        <div key={student.id} className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={`name-${index}`}
        >
          Name:
        </label>
        <input
          type="text"
          id={`name-${index}`}
          value={student.name}
          onChange={(e) => handleChange(index, "name", e.target.value)}
          required
          className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={`aadhaar-${index}`}
        >
          Aadhaar Card:
        </label>
        <input
          type="number"
          id={`aadhaar-${index}`}
          value={student.aadharCard} 
          onChange={(e) => handleChange(index, "aadharCard", e.target.value)}
          required
          className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        </div>
      ))}
        <button
          type="button"
          onClick={handleAddStudent}
          className="bg-green-600 text-white mt-4 flex justify-center m-auto items-center py-2 px-4 text-sm font-medium rounded-md"
        >
          Add Students
        </button>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="faculty"
        >
          Select faculty
        </label>
        <select
          id="faculty"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm"
        >
          <option value="" disabled>
            Select faculty
          </option>
          {faculties.map((teacher) => (
            <option key={teacher._id} value={teacher.name}>
              {teacher.name}
            </option>
          ))}
        </select>
        <button
          className="bg-green-600 text-white mt-4  flex justify-center m-auto items-center py-2 px-4 text-sm font-medium rounded-md"
          type="submit"
        >
          Save Student
        </button>
      </form>
      {message && <p className="text-green-500 mt-4">{message}</p>}
    </div>
  );
}

export default StudentForm;

