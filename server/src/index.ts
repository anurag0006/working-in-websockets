import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer(function (request: any, response: any) {
  console.log(new Date(), "Request Received for ", request.url);
  response.end("Hi There!");
});

const wss = new WebSocketServer({ server });

let usercnt = 0;

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState == WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  console.log("user count: ", ++usercnt);
  ws.send("Hello! Message from server!!");
});

server.listen(8080, function () {
  console.log("Server listening on 8080...");
});
