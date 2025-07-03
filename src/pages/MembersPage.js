import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const colorByDepth = [
  "#D0EBFF",
  "#D3F9D8",
  "#FFF3BF",
  "#FFD8A8",
  "#F8D7DA",
  "#E0BBE4",
];

function MembersPage() {
  const [members, setMembers] = useState([]);
  const [tree, setTree] = useState([]);
  const [expanded, setExpanded] = useState({}); // Tracks expanded state

  useEffect(() => {
    const fetchMembers = async () => {
      const snapshot = await getDocs(collection(db, "members"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMembers(data);
      const treeData = buildTree(data);
      setTree(treeData);
    };
    fetchMembers();
  }, []);

  const buildTree = (data) => {
    const map = {};
    const roots = [];

    data.forEach((member) => {
      map[member.id] = { ...member, children: [] };
    });

    data.forEach((member) => {
      if (member.under_disciple_id && map[member.under_disciple_id]) {
        map[member.under_disciple_id].children.push(map[member.id]);
      } else {
        roots.push(map[member.id]);
      }
    });

    return roots;
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTree = (member, depth = 0) => {
    const leader = members.find((m) => m.id === member.under_disciple_id);
    const leaderName = leader ? leader.name || `${leader.first_name} ${leader.last_name}` : "";

    const hasChildren = member.children && member.children.length > 0;
    const isOpen = expanded[member.id];

    return (
      <div key={member.id} style={{ marginLeft: depth * 20, marginBottom: 0}}>
        <div
          onClick={() => hasChildren && toggleExpand(member.id)}
          style={{
            cursor: hasChildren ? "pointer" : "default",
            border: "1px solid #ccc",
            padding: "8px 12px",
            borderRadius: "5px",
            background: colorByDepth[depth % colorByDepth.length],
            fontWeight: "bold",
            userSelect: "none",
            boxShadow: "5px 10px 5px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.2s ease-in-out",
          }}
        >
          {hasChildren && (
            <span style={{ marginRight: 8 }}>
              {isOpen ? "-" : "+"}
            </span>
          )}
          {member.name || `${member.first_name} ${member.last_name}`}{" "}
          <span style={{ fontWeight: "normal", fontSize: "0.9em", color: "#555" }}>
            ({member.children.length} disciple{member.children.length !== 1 ? "s" : ""})
          </span>
        </div>
        {isOpen &&
          member.children.map((child) => renderTree(child, depth + 1))}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1, padding: 20 }}>
        <h1 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '2rem', color: '#333' }}>Church Discipleship Tree</h1>
        {tree.map((member) => renderTree(member))}
      </div>
      <Footer />
    </div>
  );
}

export default MembersPage;
