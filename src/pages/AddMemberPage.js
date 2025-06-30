import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AddMemberPage() {
  const [name, setName] = useState("");
  const [ministry, setMinistry] = useState("");
  const [underDiscipleId, setUnderDiscipleId] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const querySnapshot = await getDocs(collection(db, "members"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(data);
    };
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "members"), {
      name,
      ministry,
      under_disciple_id: underDiscipleId || null,
    });

    setName("");
    setMinistry("");
    setUnderDiscipleId("");
    alert("Member added!");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ flex: 1, padding: "20px" }}>
        <h2>Add Member</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
          <div>
            <span>Name: </span>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <span>Ministry: </span>
            <input value={ministry} onChange={(e) => setMinistry(e.target.value)} />
          </div>

          <div>
            <span>Leader: </span>
            <select value={underDiscipleId} onChange={(e) => setUnderDiscipleId(e.target.value)}>
              <option value="">None</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          <button type="submit">Save</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default AddMemberPage;
