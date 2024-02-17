import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import "./Team.css";
import Image from "next/image";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const usersCollectionRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollectionRef);
      const users = usersSnapshot.docs.map((doc) => doc.data());

      if (!Array.isArray(users)) {
        throw new Error("Data is not an array");
      }

      const addedAuthors = {};
      const members = [];

      users.forEach((user) => {
        let cargo;
        switch (user.displayName) {
          case "Lobo Solitário":
            cargo = "Escritor";
            break;
          case "Boifubá":
            cargo = "Editor";
            break;
          case "Boiz":
            cargo = "Editor";
            break;
          default:
            cargo = "Cargo padrão";
            break;
        }

        if (
          !addedAuthors[user.displayName] &&
          (user.role === "contributor" || user.role === "admin")
        ) {
          members.push({
            nome: user.displayName,
            img: user.avatar,
            intro: "alguma intro",
            cargo: cargo,
          });
        }
      });

      setTeamMembers(members);
    }

    fetchData(); // Call the fetchData function
  }, []); // Close the useEffect hook

  return (
    <>
      <div className="centralizar">
        <h1 className="chamada-h1">Conheça nosso time!</h1>

        <div className="nossotime">
          <div className="time-grid">
            {teamMembers.map((member, index) => (
              <div className="team-item" key={index}>
                <Image
                  width={150}
                  height={150}
                  src={member.img}
                  alt={member.nome}
                />
                <div className="nome">{member.nome}</div>
                <div className="cargo">{member.cargo}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
