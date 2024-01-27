import "./Recrutamento.css";
import { FaCode, FaPencilAlt } from "react-icons/fa";
import { SiMaterialdesignicons } from "react-icons/si";
import { BiDonateHeart } from "react-icons/bi";

const boxes = [
  {
    id: 1,
    icon: FaCode,
    title: "Desenvolvedores",
    description:
      "Pessoas com conhecimento em programação web e tempo disponível para ajudar a criar e corrigir funcionalidades para o site.",
  },
  {
    id: 2,
    icon: SiMaterialdesignicons,
    title: "Designers",
    description:
      "Pessoas com conhecimento em design, mesmo que não seja específico para web, incluindo ilustradores.",
  },
  {
    id: 3,
    icon: FaPencilAlt,
    title: "Redatores",
    description:
      "Pessoas que gostam de escrever e gerar conteúdo em texto para blogs, incluindo matérias, novidades, cenários, tutoriais, etc.",
  },
  {
    id: 4,
    icon: BiDonateHeart,
    title: "Financiadores",
    description:
      "Pessoas que queiram ajudar financeiramente nos custos do projeto para mantê-lo vivo.",
  },
  {
    id: 5,
    icon: FaPencilAlt,
    title: "Comunidade",
    description:
      "Pessoas dispostas a fazer parte de nossa comunidade, dando sugestões e fazendo parcerias para o crescimento.",
  },
];

export default function QuemSomos() {
  return (
    <div>
      <div className="content">
        <h1>Junte-se à Nossa Aventura de RPG! 🚀</h1>
        <p>
          Você, que sempre sonhou em criar conteúdo de RPG para a internet, mas
          por algum motivo nunca começou, este é o seu convite especial. Seja
          por falta de tempo ou de conhecimento técnico, não se preocupe – aqui,
          todos são bem-vindos! Queremos Convidar Você para Fazer Parte do Nosso
          Mundo de Fantasia. 🎭 O que precisamos? Tudo! Queremos uma equipe
          diversificada e apaixonada.
        </p>{" "}
        <h2>Escolha seu perfil e junte-se à nossa comunidade!</h2>
        <p>
          Cada Link abaixo vai te levar para nossa comunidade do Discord, quando
          entrar mande um Alô e vamos conversar sobre como você quer ajudar a
          comunidade crescer. Venha fazer parte e escolha o seu perfil.
        </p>
        <div className="box-container">
          {boxes.map((box) => (
            <a
              key={box.id}
              href="https://discord.gg/223PjGAM2Y"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="box">
                <div className="box-icon">
                  <box.icon />
                </div>
                <h2>{box.title}</h2>
                <p>{box.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
