module.exports = [
  {
    // Vérification statut de connexion utilisateur
    method: "GET",
    path: "/is-logged-in",
    handler: (request, reply) => {
      if (
        typeof request.state["auth-cookie"] !== "undefined" &&
        request.state["auth-cookie"].authentified === true
      )
        return reply.response({
          currentUser: { name: request.state["auth-cookie"].username },
        });
      else return reply.response("Unauthorised").code(403);
    },
    /*     auth: {
      mode: "try",
    }, */
  },
  {
    method: "POST",
    path: "/login",
    handler: (request, reply) => {
      const form = request.payload;
      /*       console.log(form);
      console.log(request.state); */

      // Si utilisateur déjà connecté
      if (
        typeof request.state["auth-cookie"] !== "undefined" &&
        request.state["auth-cookie"].username === process.env.USER_NAME
      ) {
        return reply
          .response({
            state: "Warning",
            message: "Utilisateur déjà connecté",
          })
          .code(403);
        // Si identifiants non introduits
      } else if (
        typeof form === "undefined" ||
        typeof form.username === "undefined" ||
        typeof form.password === "undefined" ||
        form.username.length <= 0 ||
        form.password.length <= 0
      ) {
        return reply
          .response({
            state: "Error",
            message: "Champs manquants",
          })
          .code(403);
        // Si mauvais identifiants
      } else if (
        form.username !== process.env.USER_NAME ||
        form.password !== process.env.USER_PASSWORD
      ) {
        /*         console.log(form.username === process.env.USER_NAME);
              console.log(process.env.USER_NAME); */
        return reply
          .response({
            state: "Error",
            message: "Identifiants erronés",
          })
          .code(403);
      }
      // Si bons identifiants
      else {
        reply.state("auth-cookie", {
          authentified: true,
          username: form.username,
        });
        return {
          state: "Success",
          message: `Welcome ${form.username}`,
        };
      }
    },
  },
  {
    // Suppression du cookie d'authentification
    method: "POST",
    path: "/logout",
    handler: (request, reply) => {
      if (typeof request.state["auth-cookie"] === "undefined") {
        return reply.response({
          state: "Error",
          message: "Non connecté",
        });
      }
      return reply
        .response({
          state: "Success",
          message: "Déconnecté",
        })
        .unstate("auth-cookie");
    },
  },
];
