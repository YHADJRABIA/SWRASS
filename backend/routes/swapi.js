const Axios = require("axios"); // Module pour générer des requêtes http vers l'API de Swapi

// Filtres de recherche
const paramList = [
  "people",
  "films",
  "starships",
  "vehicles",
  "species",
  "planets",
];

module.exports = [
  // Méthode GET recherche par catégorie

  {
    method: "GET",
    path: "/swapi/{param1}/{page?}",
    handler: async (request, reply) => {
      // Vérification si l'utilisateur est connecté pour utiliser l'API, autrement le rediriger vers page 401
      if (
        typeof request.state["auth-cookie"] === "undefined" ||
        request.state["auth-cookie"].username !== process.env.USER_NAME
      ) {
        return reply.redirect("/401?error=Not logged in");
      }
      // Fournir liste de paramètres, vérifier que param1 soit inclus dans la liste de recherche et envoyer une requête à swapi.dev
      else if (!paramList.includes(request.params.param1)) {
        // Redirige vers la page 404 si paramètre non reconnu
        return reply.redirect("/404?error=Missing parameter");
      }
      // le paramètre « page » étant optionel, celui ci est mis à 1 si non spécifié
      let page = request.params.page ? request.params.page : "";
      const response = await Axios.get(
        `https://swapi.dev/api/${request.params.param1}/${page}`
      );
      // Regex pour remplacer swapi.dev par notre API intermédiaire
      let swapiData = JSON.stringify(await response.data)
        .replace(/swapi.dev\/api/gi, `localhost:${process.env.PORT}/swapi`)
        .replace(/\/"/gi, '"');
      return JSON.parse(swapiData);
    },
  },

  // Méthode GET recherche ciblée
  {
    method: "GET",
    path: "/swapi/search/{param1}/{search}",
    handler: async (request, reply) => {
      if (
        typeof request.state["auth-cookie"] === "undefined" ||
        request.state["auth-cookie"].username !== process.env.USER_NAME
      ) {
        return reply.redirect("/401?error=Not logged in");
      } else if (
        !paramList.includes(request.params.param1) ||
        typeof request.params.search === "undefined"
      ) {
        return reply.redirect("/404?error=Missing parameter");
      }
      const response = await Axios.get(
        `https://swapi.dev/api/${request.params.param1}/?search=${request.params.search}`
      );
      let swapiData = JSON.stringify(await response.data)
        .replace(/swapi.dev\/api/gi, `localhost:${process.env.PORT}/swapi`)
        .replace(/\/"/gi, '"');
      return JSON.parse(swapiData);
    },
  },
];
