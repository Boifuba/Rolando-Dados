import Grid from "@/components/Grid/Grid";
import Head from "next/head";
import Sistemas from "@/components/Sistemas/Sistemas";
import Team from "@/components/Team/Team";

export default function Home() {
  function richSnipper() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": "https://www.rolandodados.com.br/rpg",
        "name": "Rolando Dados",
        "logo": "https://www.rolandodados.com.br/rd.png",
        "sameAs": [
          "https://www.facebook.com/rolandodados",
          "https://twitter.com/rolandodados",
          "https://discord.com/invite/223PjGAM2Y"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Niterói",
          "addressRegion": "Rio de Janeiro",
          "addressCountry": "BR"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+55-21-96667-2252",
          "contactType": "Atendimento"
        }
      }`,
    };
  }
  return (
    <>
      <Head>
        <title>Rolando Dados</title>
        <link rel="icon" href="/favicon.png" />

        <meta
          name="description"
          content="Um Blog com conteúdo bacana para melhorar sua mesa de RPG e levar suas campanhas ao infinito em qualquer sistema."
        />
        <meta
          property="og:image"
          content={"https://rolandodados.com.br/face.jpg"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta name="author" content="Boifubá" />

        <meta property="og:title" content="Rolando Dados - Seu Blog de RPG" />
        <meta property="og:url" content="https://www.rolandodados.com.br/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Um Blog com conteúdo bacana para melhorar sua mesa de RPG e levar suas campanhas ao infinito em qualquer sistema."
        />
        <meta property="og:site_name" content="Rolando Dados" />

        <meta name="theme-color" content="#ea4f4c"></meta>
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={richSnipper()}
        key="product-jsonld"
      />
      <main>
        <div className="content">
          <Sistemas />
          <Grid />
          <Team />
        </div>
      </main>
    </>
  );
}
