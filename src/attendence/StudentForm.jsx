import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentForm() {
  const [name, setName] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [faculty, setFaculty] = useState("");
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    async function fetchFaculties(){
      try {
        const response = await axios.get("http://localhost:3000/getFaculty");
        setFaculties(response.data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchFaculties();
  }, []);  

  async function handleSubmit (e) {
    e.preventDefault();
    const studentData = { name, faculty, aadhaar };
    try {
      const response = await axios.post("http://localhost:3000/saveStudent", studentData);
      if (response.status === 200) {
        console.log({Message:"Student Saved"});
        setName("");
        setAadhaar("")
        
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="wrapper max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Student</h1>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name:</label>
        <input 
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required  className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        <label className="block text-sm font-medium text-gray-700" htmlFor="name">Aadhaar Card:</label>
        <input 
          type="text"
          id="name"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          required  className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        <label  className="block text-sm font-medium text-gray-700" htmlFor="faculty">Select faculty</label>
        <select
          id="faculty"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm"
        >
          <option value="" disabled>Select faculty</option>
          {faculties.map((teacher) => (
            <option key={teacher._id} value={teacher.name}>{teacher.name}</option>
          ))}
        </select>
        <button   className="bg-green-600 text-white mt-4  flex justify-center m-auto items-center py-2 px-4 text-sm font-medium rounded-md" type="submit">Save Student</button>
      </form>
    </div>
  );
}

export default StudentForm;