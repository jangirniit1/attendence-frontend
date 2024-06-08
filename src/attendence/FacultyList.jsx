import React, { useState, useEffect } from "react";
import axios from "axios";

function FacultyList({ updateData, facultyUpdated }) {
  const [faculties, setFaculties] = useState([]);

  async function fetchFaculties() {
    try {
      const response = await axios.get("http://localhost:3000/getFaculty");
      if (response.status === 200) {
        setFaculties(response.data);
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error("error");
    }
  }
  useEffect(() => {
    fetchFaculties();
  }, [updateData]);

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/deleteFaculty/${id}`
      );
      //   console.log(response);
      if (response.data === "Faculty Deleted") {
        console.log({ Message: "Faculty deleted" });
        facultyUpdated();
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error("error");
    }
  }

  return (
    <div className="wrapper max-w-lg mx-auto my-10 p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {" "}
        Fetch Faculty List
      </h1>
      <ul className="flex flex-col gap-[2rem]">
        {faculties.map((faculty) => (
          <li
            key={faculty._id}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg"
          >
            {faculty.name}
            <button
              onClick={() => handleDelete(faculty._id)}
              className="bg-red-500 text-white rounded-md px-2 py-1"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FacultyList;
