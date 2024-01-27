import "./Posts.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/pages/_app"; // Import db from _app.js
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "@/utils/UserContext";
import { useRequireLogin } from "@/utils/useRequireLogin"; // Ajuste o caminho de acordo com a localização do arquivo

export default function Posts() {
  const user = useUser();
  useRequireLogin();

  const [data, setData] = useState(null);
  useEffect(() => {
    getCollectionData();
  }, []);

  //deleta post
  async function deletePost(id) {
    const postRef = doc(db, "posts", id);
    await deleteDoc(postRef);
    // Re-fetch the posts after deletion
    getCollectionData();
  }

  async function getCollectionData() {
    const a = await getDocs(collection(db, "posts"));
    setData(
      a.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          show: data.show !== undefined ? data.show : false,
        };
      })
    ); // Include the document ID and show state from the database
  }
  async function toggleShow(index) {
    const item = data[index];
    const postRef = doc(db, "posts", item.id);
    const newShowState = !item.show;

    // Update show state in local state
    setData(
      data.map((item, i) =>
        i === index ? { ...item, show: newShowState } : item
      )
    );

    // Update show state in Firestore
    await updateDoc(postRef, { show: newShowState });
  }
  return (
    <div className="content">
      <ToastContainer />
      <h1>Lista de Posts</h1>
      <div className="grid-navigation-dark">
        {data &&
          data
            .filter(
              (item) =>
                user.role === "admin" ||
                user.role === "user" ||
                item.author === user.displayName
            )
            .map((item, index) => (
              <div key={index} className="flex-container" href="">
                <div className="image">
                  <Image
                    src={"/posts/" + item.path + "/" + item.img}
                    width={250}
                    height={120}
                    alt={item.header}
                  />
                </div>
                <div className="row">
                  <div className="grid2">
                    <div className="column1">
                      <div className="title">
                        <h3>{item.title}</h3>
                      </div>
                      <div className="text">
                        <p>{item.header}</p>
                      </div>
                    </div>
                    <div className="column2">
                      <div className="social">
                        <Link
                          className="button"
                          href={`/Admin/Editor/${item.path}`}
                        >
                          Editar
                        </Link>
                        {user.role === "admin" && (
                          <button
                            className={`button ${
                              item.show ? "preto" : "verde"
                            }`}
                            onClick={() => toggleShow(index)}
                          >
                            {item.show ? "Esconder" : "Mostrar"}
                          </button>
                        )}
                        {user.role === "admin" && (
                          <button
                            className="button dangerous"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Tem certeza de que deseja deletar este post?"
                                )
                              ) {
                                deletePost(item.id);
                                toast.success("Post deletado com sucesso!");
                              } else {
                                toast.info("Ação de deletar cancelada.");
                              }
                            }}
                          >
                            Deletar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
