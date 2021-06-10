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
  {
    method: "POST",
    path: "/swapi/search",
    handler: async (request, reply) => {
      const form = request.payload;
      // Vérification si l'utilisateur est connecté pour utiliser l'API, autrement le rediriger vers page 401
      if (
        typeof request.state["auth-cookie"] === "undefined" ||
        request.state["auth-cookie"].username !== process.env.USER_NAME
      ) {
        return reply.redirect("/401?error=Not logged in");
      }
      // Vérification si paramètres de filtre et recherche sont vides
      if (
        typeof form.keyword === "undefined" ||
        typeof form.isFiltered === "undefined"
      ) {
        return reply.redirect("/400?error=Missing parameter");
      } // Vérification si paramètre de recherche vierge
      else if (form.keyword.trim().length <= 0 && form.isFiltered.length <= 0) {
        return reply.redirect("/400?error=Wrong input");
      }
      // Si ensemble des cases filtres cochées, on considère qu'aucun filtre n'est choisi ou si injection de filtre
      if (
        form.isFiltered.length <= 0 ||
        form.isFiltered.every((el) => paramList.includes(el))
      ) {
        form.isFiltered = paramList;
      }
      let data = [];
      for (let i of paramList) {
        const response = await Axios.get(
          `https://swapi.dev/api/${i}?search=${form.keyword}`
        );
        let swapiData = JSON.stringify(await response.data)
          .replace(/swapi.dev\/api/gi, `localhost:${process.env.PORT}/swapi`)
          .replace(/\/"/gi, '"');
        data.push({ category: i, data: JSON.parse(swapiData).results });
      }

      return data;
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
