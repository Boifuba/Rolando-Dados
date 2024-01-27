import React, { useEffect, useState } from "react";
import "./TableOfContents.css";
const TableOfContents = () => {
  const [tocItems, setTocItems] = useState([]);

  useEffect(() => {
    const postContainer = document.querySelector(".main");
    if (postContainer) {
      const headers = Array.from(postContainer.querySelectorAll("h1, h2, h3"));
      const items = headers.map((header) => {
        const id = header.innerText.toLowerCase().replace(/\s+/g, "-");
        header.id = id;
        return { id, text: header.innerText };
      });
      setTocItems(items);
    }
  }, []);

  return (
    <div className="aside">
      <div className="box">
        <ul>
          {tocItems.map((item, index) => (
            <ul key={item.id}>
              <li>
                <span>{index + 1}</span>
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            </ul>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TableOfContents;
