import "./privacidade.css";
import Head from "next/head";
export default function Privacidade() {
  return (
    <>
      <Head>
        <title>Política de Privacidade</title>
        <link rel="icon" href="/rd.png" />

        <meta
          name="description"
          content="Essa é a nossa Política de Privacidade."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />

        <meta
          property="og:image"
          content="https://rolandodados.com.br/face.jpg"
        />
        <meta name="keywords" content="RPG,Política de Privacidade, GURPS" />
        <meta name="author" content="Boifubá" />
      </Head>
      <div className="content">
        <div className="title">/Privacidade</div>
        <h1>Política de Privacidade</h1>

        <p>
          Bem-vindo ao <b>Rolando Dados</b>!
        </p>

        <p>
          Esta página descreve nossas práticas de coleta e uso de informações ao
          visitar nosso blog. Ao acessar ou usar este blog, você concorda com os
          termos desta política de privacidade.
        </p>

        <h2>Coleta de Informações</h2>

        <p>
          Não coletamos informações pessoais identificáveis, como nomes,
          endereços de e-mail ou qualquer outra informação pessoal, a menos que
          você nos forneça voluntariamente através de formulários de contato ou
          outros meios similares.
        </p>

        <h2>Uso de Informações</h2>

        <p>
          Não compartilhamos informações pessoais com terceiros. Qualquer
          informação fornecida será usada exclusivamente para responder a
          consultas ou para melhorar a experiência do usuário em nosso blog.
        </p>

        <h2>Cookies e Tecnologias Semelhantes</h2>

        <p>
          Este blog pode usar cookies e tecnologias semelhantes para melhorar a
          experiência do usuário. Você pode configurar seu navegador para
          recusar todos ou alguns cookies, ou para alertá-lo quando os sites
          definem ou acessam cookies.
        </p>

        <h2>Links para Outros Sites</h2>

        <p>
          Nosso blog pode conter links para outros sites que não são operados
          por nós. Não temos controle sobre o conteúdo e práticas de privacidade
          desses sites e não aceitamos responsabilidade por suas políticas.
        </p>

        <h2>Alterações nesta Política de Privacidade</h2>

        <p>
          Podemos atualizar nossa política de privacidade de tempos em tempos.
          Recomendamos que você revise esta página periodicamente para estar
          ciente de quaisquer alterações. Ao continuar a usar nosso blog após
          quaisquer alterações nesta política, você concorda com tais
          alterações.
        </p>

        <p>
          Se você tiver alguma dúvida ou preocupação sobre nossa política de
          privacidade, entre em contato conosco através dos links de contato em
          qualquer menu de navegação.
        </p>

        <p>
          <em>Última atualização: 8 de Janeiro de 2024.</em>
        </p>
      </div>
    </>
  );
}
