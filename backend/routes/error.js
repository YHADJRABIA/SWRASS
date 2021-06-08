// Si requête envoyée vers un endpoint non existant, retourner une erreur 404.

module.exports = [
  {
    method: "*",
    path: "/404",
    handler: (request, reply) => {
      /* const accept = request.raw.req.headers.accept;
      if (accept && accept.match(/json/)) {
        return reply(Boom.notFound("Resource not available ✘"));
      } */
      return reply
        .response({
          error: true,
          code: 404,
          message: request.query.error ? request.query.error : null,
        })
        .code(404);
    },
  },
  {
    method: "*",
    path: "/401",
    handler: (request, reply) => {
      return reply
        .response({
          error: true,
          code: 401,
          message: request.query.error ? request.query.error : null,
        })
        .code(401);
    },
  },
  {
    method: "*",
    path: "/{any*}",
    handler: (request, reply) => {
      return reply
        .response({
          error: true,
          code: 404,
          message: request.query.error ? request.query.error : null,
        })
        .code(404);
    },
  },
];
