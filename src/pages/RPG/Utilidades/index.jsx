"use client";
import "./Utilidades.css";
import Link from "next/link";
import { FaPersonDigging } from "react-icons/fa6";
import { GiTwoCoins } from "react-icons/gi";

export default function Utilidades() {
  return (
    <div className="content">
      <div className="grid-navigation-dark">
        <Link href={"/RPG/Utilidades/RegraDeCavarBuraco"}>
          <i>
            <FaPersonDigging />
          </i>
          <span>Regra de Cavar Buraco</span>
        </Link>
        <Link href={"/RPG/Utilidades/Prata"}>
          <i>
            <GiTwoCoins />
          </i>
          <span>Calculadora de Prata</span>
        </Link>
        <Link href={"/RPG/Utilidades/Rolador"}>
          <i>
            <GiTwoCoins />
          </i>{" "}
          <span>Rolador de Dados</span>
        </Link>
      </div>
    </div>
  );
}
