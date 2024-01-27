"use client";
import Link from "next/link";
import "./Navigation.css";
import Image from "next/image";
import { useTheme } from "next-themes";
import { db, auth } from "@/pages/_app"; // Importe sua configuração do Firebase
import { doc, getDoc } from "firebase/firestore";
import { FaUserCircle } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export default function Navigation() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [pathname, setPathname] = useState(router.pathname);
  const [isSubmenuOpen, setSubmenuOpen] = useState(false); // Adicionado
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const uid = auth.currentUser ? auth.currentUser.uid : null;

    if (uid) {
      const userDocRef = doc(db, "users", uid);
      getDoc(userDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          setUserImage(docSnapshot.data().avatar);
        }
      });
    }
  }, []);
  useEffect(() => {
    setPathname(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    const uid = auth.currentUser ? auth.currentUser.uid : null;
    if (uid) {
      const userDocRef = doc(db, "users", uid);
      getDoc(userDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          setUserImage(docSnapshot.data().avatar);
        }
      });
    }
  }, []);

  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true); // Update isLogged state
        const userDocRef = doc(db, "users", user.uid);
        getDoc(userDocRef).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            setUserImage(docSnapshot.data().avatar);
          }
        });
      } else {
        setIsLogged(false); // Update isLogged state
      }
    });
  }, []);

  useEffect(() => {
    if (isLogged) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserImage(docSnap.data().avatar); // Use setUserImage instead of setAvatar
        } else {
          console.error("No such document!");
        }
      });
    }
  }, [isLogged]);
  return (
    <nav className="menu-navigation-dark">
      <header>
        <ToastContainer />

        <div>
          <Image
            src={"/rd.png"}
            alt={"Logo do servidor do RPG de Mesa"}
            width={150}
            height={150}
            priority={true}
          />
        </div>
      </header>
      <Link className={pathname === "/" ? "selected" : null} href={"/"}>
        <span>Home</span>
      </Link>
      <Link
        className={
          pathname === "/RPG/Utilidades/DiscordBot" ? "selected" : null
        }
        href={"/RPG/Utilidades/DiscordBot/"}
      >
        <span>Discord Bot</span>
      </Link>
      <Link
        className={pathname === "/RPG/Utilidades" ? "selected" : null}
        href={"/RPG/Utilidades"}
      >
        <span>Utilidades</span>
      </Link>
      <Link
        className={pathname === "/Contato" ? "selected" : null}
        href={"/Contato"}
      >
        <span>Contato</span>
      </Link>

      {/* SUBMENU */}
      {/* SUBMENU */}
      {/* SUBMENU */}
      {/* SUBMENU */}
      {/* SUBMENU */}
      {/* SUBMENU */}
      {/* SUBMENU */}
      {/* SUBMENU */}
      {/* SUBMENU */}
      {/* SUBMENU */}
      {/* SUBMENU */}
      <span className="submenu">
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            setSubmenuOpen(!isSubmenuOpen);
          }}
          rel="nofollow"
        >
          {isLogged && userImage ? (
            <Image
              className="avatar-firestore"
              width={32}
              height={32}
              src={userImage}
              alt={"User"}
            />
          ) : (
            <FaUserCircle className="avatar-firestore" />
          )}
        </a>
        {isSubmenuOpen && (
          <div
            className="submenu-content"
            onMouseLeave={() => {
              setSubmenuOpen(false);
            }}
          >
            {isLogged ? (
              <>
                <Link
                  className={pathname === "/Admin" ? "selected" : null}
                  href={"/Admin"}
                >
                  <span>Admin</span>
                </Link>
                <Link href="/Admin/Perfil">Editar Perfil</Link>
                <a
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        setUserImage(null); // Reset user image on sign out
                      })
                      .catch((error) => {});
                  }}
                >
                  Logout
                </a>
              </>
            ) : (
              <Link href="/Login">Logar</Link>
            )}
            <a onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
            </a>
          </div>
        )}
      </span>
    </nav>
  );
}
