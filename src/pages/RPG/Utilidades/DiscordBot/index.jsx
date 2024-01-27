import Image from "next/image";
import "./DiscordBot.css";
import Link from "next/link";
import { NextSeo } from "next-seo";
import ShareButtons from "@/components/SharedButtons/SharedButons";
export default function Bot() {
  return (
    <>
      <NextSeo
        title="Estevão - Um Discord Bot para jogar GURPS"
        description="Um bot para Discord que ajuda a jogar GURPS."
        canonical="https://rolandodados.com.br/RPG/Utilidades/DiscordBot"
        openGraph={{
          url: "https://rolandodados.com.br/RPG/Utilidades/DiscordBot",
          title: "Estevão - Um Discord Bot para jogar GURPS",
          description: "Um bot para Discord que ajuda a jogar GURPS.",
          images: [
            {
              url: "https://rolandodados.com.br/discordBot/logobranca.png",
              width: 800,
              height: 600,
              alt: "Imagem de pessoas cavando buracos",
            },
          ],
        }}
      />
      <main>
        <div className="content">
          <ShareButtons
            url="https://rolandodados.com.br/RPG/Utilidades/DiscordBot"
            title="Conheça Estevão - Um Discord Bot para jogar GURPS"
          />
          <h1>Discord Bot para GURPS</h1>
          <div className="columns-2">
            <div className="logo-column">
              <a href="https://discord.com/invite/223PjGAM2Y">
                <Image
                  className="logo"
                  src={"/discordBot/logobranca.png"}
                  alt="Share on Discord"
                  width={150}
                  height={150}
                />{" "}
              </a>
              <div className="logo-title">Estevão</div>
            </div>
            <div className="text-column">
              <p>
                Conheça Estevão, seu companheiro de jogos e bot do Discord. Com
                recursos como rolagem de dados, calculadoras e tabelas de acesso
                rápido, Estevão aprimora sua experiência de jogo. Diga adeus às
                preocupações com jogos de mesa com Estevão, seu assistente de
                jogo no Discord.
              </p>
              <p>
                Por favor, apoie Estevão contando aos seus amigos sobre ele.
                Isso será muito útil para nós. Sinta-se à vontade para convidar
                este bot para o seu servidor do Discord.
              </p>
            </div>
          </div>
          <br />
          <br />
          <h2>Como usar?</h2>
          <p>
            Você não precisa instalar nada, apenas precisa ter um canal no
            Discord ou ser administrador de um. Vocé pode{" "}
            <strong>
              <a className="a-bot" href="https://discord.com/invite/223PjGAM2Y">
                clicar aqui
              </a>
            </strong>{" "}
            e abrirá uma tela guiando você para adicionar ao seu canal. O bot
            possui diversas ferramentas para rolagem de dados e consulta de
            informações. Os comandos são todos via barra &quot;/&quot; no chat.
            Qualquer coisa entre em <a href="/Contatos">Contato</a> para obter
            suporte.
          </p>
        </div>
      </main>
    </>
  );
}
