import { log } from "console";
import http from "http";

const PORT = 7474;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Curso de node.js");
});

server.listen(PORT, () => {
  console.log("Servidor subiu 🚀🚀");
});
