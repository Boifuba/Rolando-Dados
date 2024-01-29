const fs = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");

// Lista de suas rotas
const routes = [
  { url: "/", changefreq: "daily", priority: 1 },
  { url: "/RPG/Utilidades/DiscordBot", changefreq: "daily", priority: 0.7 },
  {
    url: "/RPG/Utilidades/RegraDeCavarBuraco",
    changefreq: "daily",
    priority: 0.7,
  },
  {
    url: "/RPG/Utilidades/Prata",
    changefreq: "daily",
    priority: 0.7,
  },
  {
    url: "/RPG/Posts/GURPS-gamming-ballitics-2024",
    changefreq: "daily",
    priority: 1,
  },
  {
    url: "/RPG/Posts/120-livros-de-GURPS",
    changefreq: "daily",
    priority: 1,
  },
  {
    url: "/RPG/Posts/rito_de_passagem",
    changefreq: "daily",
    priority: 1,
  },
  {
    url: "/RPG/Posts/gerador_de_mapas",
    changefreq: "daily",
    priority: 1,
  },
  {
    url: "/RPG/Posts/GURPS-Instant-Defaults",
    changefreq: "daily",
    priority: 1,
  },
  {
    url: "/Contato",
    changefreq: "daily",
    priority: 1,
  },
  {
    url: "/RPG/Posts/Sistema-Daemon",
    changefreq: "daily",
    priority: 1,
  },
  {
    url: "/RPG/Utilidades/Rolador",
    changefreq: "daily",
    priority: 1,
  },
];

const sitemap = new SitemapStream({
  hostname: "https://rolandodados.com.br/",
});

routes.forEach((route) => {
  sitemap.write(route);
});

sitemap.end();

// Gera o sitemap
streamToPromise(sitemap).then((sitemap) => {
  fs.writeFileSync("./public/sitemap.xml", sitemap.toString());
});
