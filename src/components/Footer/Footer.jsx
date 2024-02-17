"use client";
import Link from "next/link";
import "./Footer.css";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Footer() {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkTheme);
  }, [darkTheme]);

  return (
    <div className="footer-navigation">
      <div className="footer-column">
        <div className="footer-logo">
          <Image src={"/rd.png"} width={80} height={80} alt={"Rolando Dados"} />
        </div>
      </div>
      <div className="footer-column">
        <div className="footer-title">
          <h3>Menu</h3>
        </div>
        <ul>
          <li>
            <Link href={"/"}>Página Inicial</Link>
          </li>
          <li>
            <Link href={"/RPG/Utilidades/DiscordBot"}>Discord Bot</Link>
          </li>
          <li>
            <Link href="/Contato">Contatos</Link>
          </li>
        </ul>
      </div>

      <div className="footer-column">
        <div className="footer-title">
          <h3>Outros</h3>
        </div>
        <ul>
          <li>
            <Link href={"/Privacidade"}>Privacidade</Link>{" "}
          </li>
          <li>
            <Link href={"/FAQ"}>FAQ</Link>{" "}
          </li>{" "}
        </ul>
      </div>
    </div>
  );
}
