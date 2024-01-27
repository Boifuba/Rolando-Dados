"use client";
import "./Admin.css";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { useRequireLogin } from "@/utils/useRequireLogin";
import { useUser } from "@/utils/UserContext";

export default function Admin() {
  useRequireLogin();
  const user = useUser();
  console.log("usuario:" + user); // Adicione esta linha
  return (
    <div className="content">
      <div className="grid-navigation-dark">
        {user && (user.role === "admin" || user.role === "contributor") && (
          <Link href={"/Admin/Novo"}>
            <i>
              <FaHome />
            </i>{" "}
            <span>Novo Post</span>
          </Link>
        )}
        {user && (user.role === "admin" || user.role === "contributor") && (
          <Link href={"/Admin/Posts"}>
            <i>
              <FaHome />
            </i>
            <span>Lista de Posts</span>
          </Link>
        )}

        <Link href={"/Admin/Perfil"}>
          <i>
            <FaHome />
          </i>
          <span>Editar Perfil</span>
        </Link>
        {user && user.role === "admin" && (
          <Link href={"/Admin/Users"}>
            <i>
              <FaHome />
            </i>
            <span>Listar Usuários</span>
          </Link>
        )}
      </div>
    </div>
  );
}
