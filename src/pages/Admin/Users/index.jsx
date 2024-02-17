import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import "./Users.css";
import { useRequireLogin } from "@/utils/useRequireLogin";
import Image from "next/image";

function User({ user, updateUser, deleteUser }) {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [mailing, setMailing] = useState(user.mailing);

  return (
    <div className="item" key={user.id}>
      <div className="avatar">
        <Image width={100} height={100} src={user.avatar} alt="usuário" />
      </div>
      <div className="details">
        <h3>{displayName}</h3>
        <input
          className="input-field"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          className="input-field"
          name="roles"
          id="roles"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="contributor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        <div className="checkbox-container">
          <label htmlFor="mailing">Aceita Email?</label>
          <input
            className="mailing"
            type="checkbox"
            checked={mailing}
            onChange={(e) => setMailing(e.target.checked)}
          />
        </div>
        <div className="button-container">
          <button
            className="button"
            onClick={() =>
              updateUser(user.id, displayName, email, role, mailing)
            }
          >
            Salvar
          </button>
          <button
            className="button dangerous"
            onClick={() => deleteUser(user.id)}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);
  useRequireLogin();

  useEffect(() => {
    getCollectionData();
  }, []);

  async function getCollectionData() {
    const a = await getDocs(collection(db, "users"));
    setUsers(a.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  async function updateUser(id, displayName, email, role, mailing) {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, { displayName, email, role, mailing });
    getCollectionData();
  }

  async function deleteUser(id) {
    const userRef = doc(db, "users", id);
    await deleteDoc(userRef);
    getCollectionData();
  }

  return (
    <div className="content">
      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
      ))}
    </div>
  );
}

export default UserList;
