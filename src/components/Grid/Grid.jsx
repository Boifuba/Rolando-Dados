import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import "./Grid.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useUser } from "@/utils/UserContext";

export default function Grid() {
  const [data, setData] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const user = useUser();

  function filterByTag(tag) {
    setSelectedTag(tag);
  }

  useEffect(() => {
    getCollectionData();
  }, []);

  //Isso aqui é uma funçãoo que busca as tags dentro dos posts.
  const [tags, setTags] = useState([]);
  //o firebase não aceita filtragem, então eu tenho que buscar todos os dados e filtrar no front-end para diminuir a qauantidade de dados que essa merda vai usar colocoando menos ccoisas na memoria do cliente.
  async function getCollectionData() {
    try {
      const a = await getDocs(collection(db, "posts"));
      const data = a.docs.map((doc) => {
        const item = doc.data();
        return {
          title: item.title,
          img: item.img,
          header: item.header,
          author: item.author,
          avatar: item.avatar,
          path: item.path,
          show: item.show,
          tag: item.tag,
        };
      }); // Convert documents to JS objects with only necessary fields
      setData(data);

      // Fazer as tags únicas
      const uniqueTags = [...new Set(data.flatMap((item) => item.tag))];
      setTags(uniqueTags);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  return (
    <div className="content">
      <div className="grid-navigation">
        <div className="tags">
          <button className="tag-buttom" onClick={() => filterByTag(null)}>
            Todos
          </button>
          {tags.map((tag, index) => (
            <button
              key={index}
              className="tag-buttom"
              onClick={() => filterByTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="grid-navigation-dark">
          {data &&
            data
              .filter(
                (item) =>
                  ((item.show || (user && user.role === "admin")) &&
                    !selectedTag) ||
                  (item.tag && item.tag.some((tag) => tag === selectedTag))
              )
              .map((item, index) => (
                <Link
                  key={index}
                  href={`/RPG/Posts/${item.path}`}
                  className={
                    !item.show && user && user.role === "admin" ? "hidden" : ""
                  }
                >
                  {" "}
                  <div key={`div-${index}`} className="image">
                    <Image
                      src={"/posts/" + item.path + "/" + item.img}
                      width={280}
                      height={120}
                      alt={item.header}
                      priority={true}
                    />{" "}
                  </div>
                  <div className="row">
                    <div className="title">
                      <h3>{item.title}</h3>
                    </div>
                    <div className="text">
                      <p>{item.header}</p>
                    </div>
                    <div className="social">
                      <div>
                        <div className="author">
                          <div className="avatar">
                            <Image
                              src={item.avatar}
                              width={35}
                              height={35}
                              alt={"avatar de usuário"}
                              priority={true}
                            />
                          </div>

                          <span> {item.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}
