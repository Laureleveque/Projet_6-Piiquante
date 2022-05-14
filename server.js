// Programme : attente et réponse des requêtes http

// importation du package http de Node
const http = require("http");

// importation du fichier app.js (application Express)
const app = require("./app");

// fonction normalisation de port : renvoie un port valide
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// par défaut le port 3000 si non précisé dans la variable d'environnement PORT
const port = normalizePort(process.env.PORT || "3000");

// indique à l'application express sur quel port elle doit tourner
app.set("port", port);

// fonction errorHandler recherche et gestion des erreurs
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// fonction exécutée à chaque appel effectué vers le serveur
const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// écoute des requêtes envoyées
server.listen(port);
