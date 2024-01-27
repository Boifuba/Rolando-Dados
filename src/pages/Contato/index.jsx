"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./contato.css";
import ShareButtonsHorizontal from "@/components/SharedButtons/SharedButonsHorizontal";

export default function Contato() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      }),
    });

    if (response.ok) {
      toast.success("Mensagem enviada com sucesso!");
    } else {
      toast.error("Mensagem não enviada!");
    }
  };

  return (
    <>
      {" "}
      <ToastContainer />
      <div className="content">
        <h1>Chega mais!</h1>
        <p>
          Eu ia curtir demais a ideia de ter você postando aqui comigo, gostaria
          de usar esse espaço para compartilhar suas ideias conosco? Me mande
          uma mensagem ou me procure nesses redes, os links estão abaixo.
        </p>
        <div className="grid">
          <div className="coluna1">
            <h2>Nossas redes sociais</h2>
            <div className="share-buttons">
              <ShareButtonsHorizontal
                url="www.rolandodados.com.br"
                title="Múúúú! Rolando Dados"
              />{" "}
            </div>
          </div>
          <div className="coluna2">
            <h2>Envie uma mensagem</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                placeholder="Mensagem"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button className="button" type="submit">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
