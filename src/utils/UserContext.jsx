import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../pages/_app"; // Importe sua configuração do Firebase
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Crie o Contexto
export const UserContext = createContext();

// Crie o Provider
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userDocRef = doc(db, "users", userAuth.uid);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          setUser({
            displayName: docSnapshot.data().displayName,
            avatar: docSnapshot.data().avatar,
            role: docSnapshot.data().role, // Add role here
          });
        }
      }
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

// Crie um Hook personalizado para usar o Contexto
export function useUser() {
  return useContext(UserContext);
}
