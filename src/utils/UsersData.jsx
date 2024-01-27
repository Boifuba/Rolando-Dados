import { collection, getDocs } from "firebase/firestore";
import { db } from "@/pages/_app";

// Crie um Hook personalizado para usar o Contexto
export async function getUsers() {
  const usersCollectionRef = collection(db, "users");
  const usersSnapshot = await getDocs(usersCollectionRef);
  const users = usersSnapshot.docs.map((doc) => doc.data());
  return users;
}
