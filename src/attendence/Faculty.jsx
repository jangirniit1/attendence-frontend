import React, { useState } from "react";
import axios from "axios";

function Faculty({ facultySaved }) {
  // const [name, setName] = useState("");
  const [faculties, setFaculties] = useState([{ name: "" }]);
  const [message, setMessage] = useState("");

  const handleInputChange = (index, event) => {
    const newFaculties = [...faculties];
    newFaculties[index].name = event.target.value;
    setFaculties(newFaculties);
  };

  const handleAddFaculty = () => {
    setFaculties([...faculties, { name: "" }]);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // const facultyData = { name };
    try {
      const response = await axios.post("http://localhost:3000/saveFaculty", {
        faculties,
      });
      if (response.status === 200) {
        console.log({ Message: "Faculty Saved" });
        // setName("");
        setFaculties([{ name: "" }]);
        setMessage("Faculty Saved Successfully");
        facultySaved();
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error("error");
    }
  }

  return (
    <div className="wrapper max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Faculty</h1>
      <form onSubmit={handleSubmit}>
        {faculties.map((faculty, index) => (
          <div key={index}>
            <label
              htmlFor="name"
              className=" text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id={`name-${index}`}
              value={faculty.name}
              onChange={(e) => handleInputChange(index, e)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddFaculty}
          className="bg-green-600 text-white mt-4 flex justify-center m-auto items-center py-2 px-4 text-sm font-medium rounded-md"
        >
          Add Faculty
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white mt-4  flex justify-center m-auto items-center py-2 px-4 text-sm font-medium rounded-md"
        >
          Save Faculty
        </button>
      </form>
      {message && <p className="text-center text-green-600 mt-4">{message}</p>}
    </div>
  );
}

export default Faculty;
