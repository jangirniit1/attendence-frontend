import React, { useState } from "react";
import axios from "axios";

function Faculty({ facultySaved }) {
  const [name, setName] = useState("");
 
  async function handleSubmit(e) {
    e.preventDefault();
    const facultyData = { name };
    try {
      const response = await axios.post("http://localhost:3000/saveFaculty", facultyData);
      if (response.status === 200) {
       
        console.log({Message:"Faculty Saved"});
        setName("");
        setMessage("Faculty Saved Successfully");
        facultySaved();
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <div className="wrapper max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Faculty</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className=" text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="bg-green-600 text-white mt-4  flex justify-center m-auto items-center py-2 px-4 text-sm font-medium rounded-md">Save Faculty</button>
      </form>
     
    </div>
  );
}

export default Faculty;