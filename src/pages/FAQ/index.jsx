import "./FAQ.css";
import Head from "next/head";
export default function FAQ() {
  return (
    <>
      <Head>
        <title>Rolando Dados</title>
        <link rel="icon" href="/rpg/boi.svg" />

        <meta
          name="description"
          content="Perguntas frequentes que as pessoas fazem sobre o blog e seu conteúdo."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/rpg/favicon/favicon-32x32.png" />

        <meta
          property="og:image"
          content="https://rolandodados.com.br/rpg/face.jpg"
        />
        <meta name="keywords" content="RPG,FAQ, GURPS" />
        <meta name="author" content="Boifubá" />
      </Head>
      <div className="content">
        <div className="title">/FAQ</div>

        <div className="f-container">
          <div className="faq">
            <br />
            <h1 id="1">Sobre o Blog</h1>
            <br />
            <h3>Eu posso contribuir com textos para o Blog?</h3>
            <p>
              Sim, qualquer um pode escrever para esse blog desde que atenda os
              requisitos para isso.
            </p>
            <h3>Quais assuntos eu posso abordar nos meus textos?</h3>
            <p>
              Qualquer assunto relacionado à RPG que seja relevante para maioria
              das pessoas e que seja autoral e não esteja publicado em nenhum
              outro lugar na internet em forma de texto.
            </p>
            <h3>Quais assuntos são proibidos aqui?</h3>
            <p>
              Qualquer tipo de pauta moral ou texto que tenham o foco em
              simplesmente inflamar as pessoas, discurso de ódio, racismo e
              preconceito. Ofensas à pessoas públicas, publicações de editora,
              sistemas e crenças. Qualquer assunto não relacionado à RPG é
              proibido.
            </p>
            <h1 id="divulgacao">Divulgação</h1>
            <br />
            <h3>Eu posso divulgar algo aqui?</h3>
            <p>
              Claro, sinta-se à vontade para divulgar seu projeto, evento ou
              produto desde que ele esteja contido em um texto que
              necessariamente traga um conteúdo útil para o leitor e não seja
              uma mera propaganda.
            </p>
            <h3>Eu posso fazer uma propaganda de evento ou produto aqui?</h3>
            <p>
              Sim, temos espaços para banner dentro da barra lateral de nossas
              postagens. A arte deve ser fornecida respeitando o design e
              dimensões do blog (200x500). O banner deve ser fornecido em
              formato PNG ou JPG. Ele permancerá no blog por 30 dias e será
              removido após esse período ou até o dia evento se for o caso.
            </p>
            <h1 id="dados">Sobre meus dados</h1>
            <h3>Quais informações o blog registra?</h3>
            <p>
              Nenhum, todo o sistema de login é feito através do Google e esse
              site não registra nenhum dado seu salvo excessão se houver
              submetido seu e-mail a alguma lista newsletter.
            </p>
            <h1 id="remoção">Remoção de Conteúdo</h1>
            <h3>Eu posso ter meu conteúdo removido?</h3>
            <p>
              Se for constado que seu material é de autoria de outra pessoa ou
              não credita devidamente ao autor ele pode ser retirado
              imediatamente e sem consulta.
            </p>
            <h3>Este site possui material autoral meu.</h3>
            <p>
              Caso identifique algum produto, marca ou texto que não deveria
              estar sendo publicado aqui, entre imediatamente em contato para a
              remoção do conteúdo ou ajustes para creditar devidamente o autor
              caso isso seja possível.
            </p>

            <h3>Um conteúdo deste site é ofensivo a mim</h3>
            <p>
              Todas as postagens são verificadas antes de serem publicadas e se
              mesmo assim houver algo que seja ofensivo, me procure e iremos
              idenficar a melhor maneira de corrigir isso, seja retirando o
              texto ou modificando.
            </p>
            <h1 id="compartilhamento">Compartilhamento</h1>
            <h3>Eu posso compartilhar o conteúdo do site?</h3>
            <p>
              Pode sim, desde que use as ferramentas do site para fazê-lo
              trazendo sua audiência para esse site.Caso esteja divulgando em
              algum veículo que não possa ser compartilhadoo através das
              ferramentas desse site, inclua o nome do autor e o site na
              poostagem.
            </p>
            <h3>
              Eu posso fazer reacts de texto ou copiar parte ou texto inteiro?{" "}
            </h3>
            <p>
              Você pode fazer reacts desde que idenfique no video claramente o
              site e coloque a url no primeiro coomentárioo fixado ou descrição.
              Se precisar usar trechos de texto (quotes) coloque o nome doo
              autor com um link para o site.{" "}
            </p>
          </div>
          <div className="indice">
            <p>Índice</p>
            <ul>
              <li>
                <a href="#1">Sobre o Blog</a>
              </li>
              <li>
                <a href="#divulgacao">Divulgação</a>
              </li>
              <li>
                <a href="#dados">Sobre meus dados</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
