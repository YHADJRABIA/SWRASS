// Routeur
const auth = require("./auth.js");
const swapi = require("./swapi.js");
const error = require("./error.js"); // Important que cette route soit mise en dernier pour éviter qu'une valide soit reconnue comme invalide

module.exports = [].concat(auth, swapi, error);
