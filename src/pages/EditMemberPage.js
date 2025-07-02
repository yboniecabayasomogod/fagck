import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../database/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function EditMemberPage() {
  const [members, setMembers] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [member, setMember] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    birthdate: "",
    gender: "",
    contact_number: "",
    email: "",
    address: "",
    ministry: "",
    under_disciple_id: "",
  });

  useEffect(() => {
    const fetchMembers = async () => {
      const snapshot = await getDocs(collection(db, "members"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMembers(data);
    };
    fetchMembers();
  }, []);

  const handleSelectChange = async (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const docRef = doc(db, "members", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setMember(docSnap.data());
    } else {
      alert("No such member found.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "members", selectedId);
      await updateDoc(docRef, member);
      alert("Member updated successfully!");
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Failed to update member.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ flex: 1, padding: "40px 20px", maxWidth: 600, margin: "0 auto" }}>
        <h2 className="mb-4 text-center">Edit Member</h2>

        <div className="mb-4">
          <label className="form-label fw-bold">Select Member</label>
          <select
            className="form-select"
            value={selectedId}
            onChange={handleSelectChange}
          >
            <option value="">-- Choose Member --</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name || `${m.first_name} ${m.last_name}`}
              </option>
            ))}
          </select>
        </div>

        {selectedId && (
          <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
            {[
              { label: "First Name", name: "first_name" },
              { label: "Middle Name", name: "middle_name" },
              { label: "Last Name", name: "last_name" },
              { label: "Suffix", name: "suffix" },
              { label: "Birthdate", name: "birthdate", type: "date" },
              { label: "Gender", name: "gender", type: "select", options: ["Male", "Female"] },
              { label: "Contact Number", name: "contact_number" },
              { label: "Email", name: "email", type: "email" },
              { label: "Address", name: "address" },
              { label: "Ministry", name: "ministry" },
            ].map(({ label, name, type = "text", options }) => (
              <div className="mb-4" key={name}>
                <label className="form-label fw-bold mb-2">{label}</label>
                {type === "select" ? (
                  <select
                    className="form-select"
                    name={name}
                    value={member[name] || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select {label}</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    className="form-control border rounded px-3 py-2"
                    name={name}
                    value={member[name] || ""}
                    onChange={handleChange}
                    required={name !== "suffix" && name !== "middle_name" && name !== "ministry"}
                  />
                )}
              </div>
            ))}

            <div className="mb-4">
              <label className="form-label fw-bold mb-2">Under Leader</label>
              <select
                className="form-select"
                name="under_disciple_id"
                value={member.under_disciple_id || ""}
                onChange={handleChange}
              >
                <option value="">-- No Leader --</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name || `${m.first_name} ${m.last_name}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary" type="submit">
                Update Member
              </button>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default EditMemberPage;
