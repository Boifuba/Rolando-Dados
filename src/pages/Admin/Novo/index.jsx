import "./Novo.css";
import { db } from "@/utils/firebase";
import { collection, addDoc } from "firebase/firestore";

import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor as TinyMCE } from "@tinymce/tinymce-react";

import { getUsers } from "@/utils/UsersData";

export default function Novo() {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [img, setImg] = useState("");
  const [system, setSystem] = useState("");
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [header, setHeader] = useState("");
  const [path, setPath] = useState("");
  const [users, setUsers] = useState([]);
  const [avatar, setAvatar] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const docData = {
      author: author,
      avatar: avatar,
      content: content,
      date: date,
      // img: "/posts/" + path + "/" + img,
      img: img,
      system: system.split(",").map((item) => item.trim()),
      tag: tag.split(",").map((item) => item.trim()),
      title: title,
      path: path,
      header: header,
    };

    try {
      const postsCollection = collection(db, "posts");
      const docRef = await addDoc(postsCollection, docData);
      const notify = () => toast.success("Post enviado com sucesso!");
      notify();
    } catch (error) {
      const notify = () => toast.error("Deu merda nessa porra");
      console.error("Error adding document: ", error);

      notify();
    }
  };
  return (
    <div className="content">
      <h1 className="title">Novo Post</h1>
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
                apiKey="ezly3g7sfcmytk3oz37ws8cfy4v1beor3s1ttpdov20r8o1q"
                init={{
                  toolbar:
                    "undo redo |code| blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
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
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
