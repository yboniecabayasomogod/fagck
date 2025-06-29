import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../database/firebase";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [newDisciple, setNewDisciple] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      const querySnapshot = await getDocs(collection(db, "members"));
      const memberList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(memberList);
    };

    fetchMembers();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
    setNewDisciple("");
  };

  const handleAddDisciple = async (memberId) => {
    if (!newDisciple.trim()) return;

    const member = members.find((m) => m.id === memberId);
    const updatedDisciples = [
      ...(member.disciples || []),
      { id: uuidv4(), name: newDisciple },
    ];

    await updateDoc(doc(db, "members", memberId), { disciples: updatedDisciples });

    setNewDisciple("");
    toggleExpand(null); // Refresh the view
    toggleExpand(memberId);
  };

  const handleDeleteDisciple = async (memberId, discipleId) => {
    const member = members.find((m) => m.id === memberId);
    const updatedDisciples = (member.disciples || []).filter(d => d.id !== discipleId);

    await updateDoc(doc(db, "members", memberId), { disciples: updatedDisciples });

    toggleExpand(null); // Refresh
    toggleExpand(memberId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Church Members</h2>

      <div className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="border rounded-lg shadow p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-blue-800">{member.name}</h3>
                <p className="text-gray-600">Ministry: {member.ministry}</p>
              </div>
              <button
                onClick={() => toggleExpand(member.id)}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                {expanded === member.id ? "Hide Disciples" : "View Disciples"}
              </button>
            </div>

            {expanded === member.id && (
              <div className="mt-4 ml-4 space-y-2">
                <h4 className="text-md font-semibold text-gray-700 mb-2">Disciples:</h4>

                <ul className="ml-4 list-disc text-gray-800">
                  {(member.disciples || []).map((disciple) => (
                    <li key={disciple.id} className="flex justify-between items-center">
                      <Link
                        to={`/disciple/${disciple.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {disciple.name}
                      </Link>
                      <button
                        onClick={() => handleDeleteDisciple(member.id, disciple.id)}
                        className="text-red-500 hover:text-red-700 text-sm ml-4"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newDisciple}
                    onChange={(e) => setNewDisciple(e.target.value)}
                    placeholder="New Disciple Name"
                    className="border p-1 rounded w-full"
                  />
                  <button
                    onClick={() => handleAddDisciple(member.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersPage;
