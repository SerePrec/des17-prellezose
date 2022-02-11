import { Server as Httpserver } from "http";
import cluster from "cluster";
import { Server as IoServer } from "socket.io";
import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter";
import config from "./config.js";
import { logger } from "./logger/index.js";

const MODE = config.MODE;

async function startServer() {
  const { default: app } = await import("./app.js");
  const { default: sockets } = await import("./sockets.js");

  const PORT = config.PORT;

  //Instancio servidor http y websocket
  const httpServer = new Httpserver(app);
  const io = new IoServer(httpServer);

  // Uso el adaptador de cluster
  MODE === "cluster" && io.adapter(createAdapter());

  // Configuro las funcionalidades del websocket
  sockets(io);

  // Puesta en marcha del servidor
  httpServer
    .listen(PORT, () =>
      logger.info(
        `Servidor http con websockets escuchando en el puerto ${
          httpServer.address().port
        } - WORKER PID ${process.pid}`
      )
    )
    .on("error", error =>
      logger.error(`Ocurrió un error en el servidor:\n ${error}`)
    );
}

if (MODE === "cluster" && cluster.isPrimary) {
  logger.info(`Proceso Master iniciado con PID ${process.pid}`);

  // setup conexiones entre workers
  setupPrimary();

  for (let i = 0; i < config.numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    logger.warn(
      `Worker con PID ${worker.process.pid} terminado - ${
        signal || code
      } - [${new Date().toLocaleString()}]`
    );
    cluster.fork();
  });
} else if (MODE === "cluster" || MODE === "fork") startServer();
else logger.error(`Parámetro 'mode' inválido`);
