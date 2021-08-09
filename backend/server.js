"use strict";
require("dotenv").config({ path: `${__dirname}/config/.env` }); // Accès aux données cachées du .env
const path = require("path");
const PORT = process.env.PORT || 5000; // Si .env innaccessible ou port déjà occupé alors utiliser le port 5000
const HOST = process.env.HOST || "localhost";
const router = require("./routes/router.js"); // Routes vers differents endpoints du backend
const Hapi = require("@hapi/hapi"); // Framework NodeJS utilisé pour le serveur

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    /*    host: HOST, */ //should be removed to avoid hosting bugs on Heroku

    routes: {
      // Afin que des requêtes externes puissent être faites au serveur
      cors: {
        origin: ["*"], // Autoriser les requêtes provenant des ports locaux uniquement (pour éviter les probleèmes de CORS en phase de développement)
        credentials: true,
      },
    },
  });

  // Cookie d'authentification
  server.state("auth-cookie", {
    ttl: 24 * 60 * 60 * 1000, // 24 heures
    isSecure: false, // Http non sécurisé accepté
    encoding: "base64json",
    path: "/",
  });

  // Rendu static servi si application en production

  await server.register(require("@hapi/inert"));

  server.route({
    method: "GET",
    path: "/hello",
    handler: (request, reply) => {
      return "hello world";
    },
    /* path: "/{param*}",
    handler: {
      directory: {
        path: reply.file(
          path.join(__dirname, "../frontend/build", "index.html")
        ),
              redirectToSlash: true, 
      },
    }, */
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, reply) => {
      reply.file(path.join(__dirname, "frontend", "build", "index.html"));
    },

    /* path: "/{param*}",
    handler: {
      directory: {
        path: reply.file(
          path.join(__dirname, "../frontend/build", "index.html")
        ),
              redirectToSlash: true, 
      },
    }, */
  });

  // Endpoints
  server.route(router);

  // Lancement du serveur
  await server.start();
  console.log(`Server running on port ${server.info.uri} ✓`);
};

console.log("Used port is", PORT);

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
