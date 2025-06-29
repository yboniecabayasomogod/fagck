import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../database/firebase"; // Make sure path is correct

const AddMember = () => {
  const [member, setMember] = useState({
    name: "",
    age: "",
    contact: "",
    ministry: "",
  });

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "members"), member);
      alert("Member added successfully!");
      setMember({ name: "", age: "", contact: "", ministry: "" });
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Error adding member. Check the console.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">Add Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={member.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="age"
          value={member.age}
          onChange={handleChange}
          placeholder="Age"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="contact"
          value={member.contact}
          onChange={handleChange}
          placeholder="Contact Number"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="ministry"
          value={member.ministry}
          onChange={handleChange}
          placeholder="Ministry (e.g., Music, Youth)"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Member
        </button>
      </form>
    </div>
  );
};

export default AddMember;