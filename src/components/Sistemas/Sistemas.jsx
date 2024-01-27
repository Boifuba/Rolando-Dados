import { useEffect } from "react";
import Typewriter from "typewriter-effect/dist/core";
import "./Sistemas.css";

export default function Sistemas() {
  useEffect(() => {
    new Typewriter("#typewriter", {
      strings: [
        "GURPS",
        "Dungeons & Dragons",
        "Vampire: The Masquerade",
        "Call of Cthulhu",
        "Mundo das trevas",
        "Mutantes & Malfeitores",
        "Mundos Selvagens",
        "Daemon",
      ],
      autoStart: true,
      loop: true,
    });
  }, []);

  return (
    <>
      <div className="type">
        <h2>Aqui nós falamos de</h2>

        <h2 id="typewriter"></h2>
      </div>
    </>
  );
}
