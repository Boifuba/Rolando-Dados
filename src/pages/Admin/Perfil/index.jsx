import "./Perfil.css";
import { useEffect, useState, useRef } from "react";
import { auth, db, storage } from "@/pages/_app";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Perfil() {
  const [avatar, setAvatar] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [mailing, setMailing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    // Limpar a inscrição quando o componente for desmontado
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (uid) {
      const userDocRef = doc(db, "users", uid);
      getDoc(userDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            let userAvatar = docSnapshot.data().avatar;
            if (userAvatar === "") {
              userAvatar = "/boi.svg"; // Use "/boi.svg" como padrão se não houver avatar
            }
            setAvatar(userAvatar);
            setDisplayName(docSnapshot.data().displayName);
            setEmail(docSnapshot.data().email);
            setMailing(docSnapshot.data().mailing);
          }
          setLoading(false); // Definir carregamento como falso após recuperar os dados
        })
        .catch((error) => {
          console.error("Erro ao carregar documento: ", error);
          setLoading(false); // Definir carregamento como falso mesmo se houver um erro
        });
    }
  }, [uid]);

  const handleImageUpload = async (imageFile) => {
    if (uid) {
      const storageRef = ref(storage, `avatars/${uid}`);
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = async (e) => {
        const dataURL = e.target.result;
        await uploadString(storageRef, dataURL, "data_url");
        const downloadURL = await getDownloadURL(storageRef);
        setAvatar(downloadURL);

        // Atualize o avatar no Firestore com o URL de download completo
        const userDocRef = doc(db, "users", uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          await updateDoc(userDocRef, { avatar: downloadURL });
        } else {
          await setDoc(userDocRef, { avatar: downloadURL });
        }
      };
    }
  };

  const fileInputRef = useRef(null);
  const handleFrameClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userDocRef = doc(db, "users", uid);
    await setDoc(
      userDocRef,
      { avatar, displayName, email, mailing, role: "user", uid },
      { merge: true }
    );

    // Exibir um toast de sucesso
    toast.success("Perfil atualizado com sucesso!");

    // Recarregar a página para atualizar a imagem
    window.location.reload();
  };

  if (loading) {
    return <div>Carregando...</div>; // Renderizar algum tipo de indicador de carregamento
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <section className="content">
          <h1 className="title">Editar Perfil</h1>

          <div className="container">
            <div className="grid2">
              <div className="column-1">
                <label htmlFor="displayName">Apelido</label>
                <input
                  id="displayName"
                  type="text"
                  placeholder="Apelido"
                  value={displayName || ""}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="mailing">
                  <span>Eu desejo receber notificações por e-mail.</span>
                  <input
                    id="mailing"
                    type="checkbox"
                    name="mailing"
                    checked={mailing || false}
                    onChange={(e) => setMailing(e.target.checked)}
                  />
                </div>
              </div>
              <div className="column-2">
                <div className="frame" onClick={handleFrameClick}>
                  {avatar && (
                    <Image
                      width={132}
                      height={132}
                      src={avatar}
                      className="avatar-firestore"
                      alt="Avatar do usuário"
                    />
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />
              </div>
            </div>
            <br />
            <button className="button" type="submit">
              Salvar
            </button>
          </div>
        </section>
      </form>
    </>
  );
}
