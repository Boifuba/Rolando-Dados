import Image from "next/image";

import { useState, useEffect } from "react";
import "./Related.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";

export default function Related() {
  const [data, setData] = useState(null);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  useEffect(() => {
    getCollectionData();
  }, []);

  //Isso aqui é uma funçãoo que busca as tags dentro dos posts.

  async function getCollectionData() {
    try {
      const a = await getDocs(collection(db, "posts"));
      let data = a.docs.map((doc) => doc.data()); // Convert documents to JS objects
      shuffleArray(data);
      data = data.slice(0, 3); // Get the first 3 items
      setData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  return (
    <div className="grid-navigation-dark">
      {data &&
        data.map((item, index) => (
          <a key={index} href={`/RPG/Posts/${item.path}`}>
            <div key={`div-${index}`} className="images">
              <Image
                src={"/posts/" + item.path + "/" + item.img}
                height={280}
                width={120}
                alt={item.header}
                priority={true}
              />{" "}
            </div>
            <div className="row">
              <div className="title">
                <h3>{item.title}</h3>
              </div>
              <div className="grid-text">
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
                        alt={"Avatar de Usuário"}
                        priority={true}
                      />
                    </div>
                    <span> {item.author}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
    </div>
  );
}
