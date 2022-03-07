import { fork } from "child_process";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { logger } from "../logger/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const ACTIVE_RANDOMS_CHILD_PROCESS = true;

export const getRandoms = (req, res) => {
  if (ACTIVE_RANDOMS_CHILD_PROCESS) {
    const { cant = 1e8 } = req.query;
    if (Number(cant)) {
      const child = fork(
        path.join(__dirname, "..", "childProcesses", "calcRandomNumbers.js")
      );

      child.on("message", msg => {
        //handshake
        if (msg === "ready")
          child.send({
            action: "start",
            payload: { min: 1, max: 1000, qty: Number(cant) }
          });
        else res.json(msg);
      });
      child.on("error", error => {
        logger.error(
          `Error en Child process 'calcRandomNumbers' con pid:${child.pid}:\n${error}`
        );
        res.status(500).send({ error: "error interno del servidor" });
      });
      child.on("close", code => {
        logger.info(
          `Child process 'calcRandomNumbers' con pid:${child.pid} terminado con código ${code}`
        );
        if (code !== 0)
          res.status(500).send({ error: "error interno del servidor" });
      });
    } else res.json({ error: "valor de parámetro inválido" });
  } else {
    logger.warn(`API randoms no activa!`);
    res.json({ message: "API randoms no activa" });
  }
};
