import "./Editor.css";
import { db } from "@/utils/firebase";
import { useRouter } from "next/router";
import Link from "next/link";

import { useEffect } from "react";
import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { updateDoc, setDoc, doc } from "firebase/firestore";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor as TinyMCE } from "@tinymce/tinymce-react";

import { getUsers } from "@/utils/UsersData";

export default function Editor() {
  const router = useRouter();
  const { path } = router.query;

  const [author, setAuthor] = useState("");
  const [header, setHeader] = useState("");
  const [img, setImg] = useState("");
  const [system, setSystem] = useState("");
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    if (path) {
      const fetchData = async () => {
        const q = query(collection(db, "posts"), where("path", "==", path));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setAuthor(data.author);
          setHeader(data.header);
          setImg(data.img);
          setSystem(data.system);
          setTag(data.tag);
          setTitle(data.title);
          setDate(data.date);
          setContent(data.content);
        } else {
          console.log("No such document!");
        }
      };

      fetchData();
    }
  }, [path]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const q = query(collection(db, "posts"), where("path", "==", path));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      const docRef = doc(db, "posts", docId);

      // Convert system and tag to arrays of strings
      const systemArray =
        typeof system === "string"
          ? system.split(",").map((item) => item.trim())
          : [];
      const tagArray =
        typeof tag === "string"
          ? tag.split(",").map((item) => item.trim())
          : [];

      await updateDoc(docRef, {
        author: author,
        header: header,
        img: img,
        system: systemArray,
        tag: tagArray,
        title: title,
        date: date,
        content: content,
      });

      toast.success("Post editado com sucesso!");
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
      // Defina o autor como o primeiro usuário por padrão
      if (usersData.length > 0) {
        setAuthor(usersData[0].displayName);
        setAvatar(usersData[0].avatar);
      }
    };

    fetchUsers();
  }, []);

  const handleAuthorChange = (event) => {
    const selectedUser = users.find(
      (user) => user.displayName === event.target.value
    );
    setAuthor(selectedUser.displayName);
    setAvatar(selectedUser.avatar);
  };

  return (
    <div className="content">
      <h1 className="title">Editar Post</h1>
      <div className="container">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-25">
              <label htmlFor="title">Image</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="image"
                name="image"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="title">Titulo</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="header">Intro</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="header"
                name="header"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
              />
            </div>
          </div>
          {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
          <div className="inrow">
            <div className="row">
              <div className="col-25">
                <label htmlFor="date">Data</label>
              </div>
              <div className="col-25">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label htmlFor="coisa">Endereço</label>
              </div>
              <div className="col-25">
                <input
                  type="text"
                  id="path"
                  name="path"
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
          <div className="row">
            <div className="col-25">
              <label htmlFor="system">Sistemas</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="system"
                name="system"
                value={system}
                onChange={(e) => setSystem(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="system">Tags</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="tags"
                name="tags"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="author">Autor</label>
            </div>
            <div className="col-75">
              <select value={author} onChange={handleAuthorChange}>
                {users &&
                  users.map((user, index) => (
                    <option key={index} value={user.displayName}>
                      {user.displayName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="content">Content</label>
            </div>
            <div className="col-75">
              <TinyMCE
                id="content"
                name="content"
                value={content}
                onEditorChange={(content, editor) => setContent(content)}
                apiKey="2s438yz73ps99ekdf1rqgi1scw9h5bnp8uhvz4yy78xp7qy6"
                init={{
                  toolbar:
                    "undo redo |code| blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                  ai_request: (request, respondWith) =>
                    respondWith.string(() =>
                      Promise.reject("See docs to implement AI Assistant")
                    ),
                }}
              />
            </div>
          </div>
          <div className="row">
            <Link href="/Admin/Posts" className="button">
              Voltar
            </Link>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
