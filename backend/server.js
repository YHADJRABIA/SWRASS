"use strict";
require("dotenv").config({ path: `${__dirname}/config/.env` }); // Accès aux données cachées du .env

const PORT = process.env.port; // Si .env innaccessible ou port déjà occupé alors utiliser le port 5001
const router = require("./routes/router.js"); // Routes vers differents endpoints du backend
const Hapi = require("@hapi/hapi"); // Framework NodeJS utilisé pour le serveur

const init = async () => {
  const server = Hapi.server({
    port: PORT || 5000,
    host: "localhost",

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

  // Endpoints
  server.route(router);

  // Lancement du serveur
  await server.start();
  console.log(`Server running on port ${server.info.uri} ✓`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
