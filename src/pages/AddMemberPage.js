import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AddMemberPage() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
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
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      suffix,
      birthdate,
      gender,
      contact_number: contactNumber,
      email,
      address,
      ministry,
      under_disciple_id: underDiscipleId || null,
    });

    setFirstName("");
    setMiddleName("");
    setLastName("");
    setSuffix("");
    setBirthdate("");
    setGender("");
    setContactNumber("");
    setEmail("");
    setAddress("");
    setMinistry("");
    setUnderDiscipleId("");
    alert("Member added!");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ flex: 1, padding: "40px 20px", maxWidth: 600, margin: "0 auto" }}>
        <h2 className="mb-4 text-center">Add New Member</h2>

        <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
          <div className="mb-4">
            <label className="form-label fw-bold mb-2">First Name</label>
            <input
              type="text"
              className="form-control border rounded px-3 py-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold mb-2">Middle Name</label>
            <input
              type="text"
              className="form-control border rounded px-3 py-2"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold mb-2">Last Name</label>
            <input
              type="text"
              className="form-control border rounded px-3 py-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold mb-2">Suffix (if any)</label>
            <input
              type="text"
              className="form-control border rounded px-3 py-2"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold mb-2">Birthdate</label>
            <input
              type="date"
              className="form-control border rounded px-3 py-2"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold mb-2">Gender</label>
            <select
              className="form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold mb-2">Contact Number</label>
            <input
              type="tel"
              className="form-control border rounded px-3 py-2"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold mb-2">Email</label>
            <input
              type="email"
              className="form-control border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold mb-2">Address</label>
            <input
              type="text"
              className="form-control border rounded px-3 py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold mb-2">Ministry</label>
            <input
              type="text"
              className="form-control border rounded px-3 py-2"
              value={ministry}
              onChange={(e) => setMinistry(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold mb-2">Under Leader</label>
            <select
              className="form-select"
              value={underDiscipleId}
              onChange={(e) => setUnderDiscipleId(e.target.value)}
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
            <button className="btn btn-success" type="submit">
              Save Member
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default AddMemberPage;
