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

  const renderTree = (member, depth = 0) => {
    const leader = members.find((m) => m.id === member.under_disciple_id);
    const leaderName = leader ? leader.name || `${leader.first_name} ${leader.last_name}` : "";

    return (
      <div key={member.id} style={{ marginLeft: depth * 20, marginBottom: 8 }}>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "8px 12px",
            borderRadius: "5px",
            background: colorByDepth[depth % colorByDepth.length],
            fontWeight: "bold",
          }}
        >
          {member.name || `${member.first_name} ${member.last_name}`}
          {leaderName && (
            <div style={{ fontWeight: "normal", fontSize: "0.9em", color: "#555" }}>
              Under: {leaderName}
            </div>
          )}
        </div>
        {member.children && member.children.map((child) => renderTree(child, depth + 1))}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ flex: 1, padding: 20 }}>
        <h2>Church Discipleship Tree</h2>
        {tree.map((member) => renderTree(member))}
      </div>

      <Footer />
    </div>
  );
}

export default MembersPage;
