import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase"; // Import your Firebase instance
import "./Tags.css";

export default function Tags() {
  const [systems, setSystems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const fetchedSystems = querySnapshot.docs.flatMap((doc) => {
        const data = doc.data();

        return data.system ? data.system : [];
      });
      setSystems(fetchedSystems);
    };

    fetchData().catch((error) => {
      console.error("Error:", error); // Log any errors
    });
  }, []);

  return (
    <div className="tagcloud">
      {systems.map(
        (system, index) =>
          system && (
            <div className="tag" key={index}>
              {system}
            </div>
          )
      )}
    </div>
  );
}
