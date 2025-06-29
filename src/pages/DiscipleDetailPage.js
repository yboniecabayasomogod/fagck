import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";

const DiscipleDetailPage = () => {
  const { id } = useParams();
  const [disciple, setDisciple] = useState(null);
  const [parentName, setParentName] = useState("");

  useEffect(() => {
    const fetchDisciple = async () => {
      const querySnapshot = await getDocs(collection(db, "members"));
      for (const docSnap of querySnapshot.docs) {
        const member = docSnap.data();
        const found = (member.disciples || []).find((d) => d.id === id);
        if (found) {
          setDisciple(found);
          setParentName(member.name);
          break;
        }
      }
    };

    fetchDisciple();
  }, [id]);

  if (!disciple) return <p className="text-center mt-10">Disciple not found.</p>;

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">{disciple.name}</h2>
      <p className="text-gray-600">Disciple of <strong>{parentName}</strong></p>
    </div>
  );
};

export default DiscipleDetailPage;
