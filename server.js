const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("./server/config/mongoose.js");
require("./server/models/user.js");

const http = require("http");
const server = http.Server(app);

const socketIO = require("socket.io");
const io = socketIO(server);

const port = process.env.PORT || 3000;

io.on("connection", client => {
  console.log("A new user has connected");

  client.on("new-user", user => {
    user.id = client.id;
    console.log(user);
    io.emit("emit-new-user", user);
  });

  client.on("new-message", message => {
    console.log(message);
    io.emit("emit-new-message", message);
  });

  client.on("new-thread", thread => {
    console.log(thread);
    io.emit("emit-new-thread", thread);
  });

  //   client.on("message", handleMessage);

  //   client.on("threadrooms", handleGetThreadRooms);

  //   client.on("activeUsers", handleGetActiveUsers);

  client.on("disconnect", function() {
    console.log("client disconnect...", client.id);
  });

  client.on("error", function(err) {
    console.log("received error from client:", client.id);
    console.log(err);
  });
});

app.use(express.static(__dirname + "/public/dist/public"));
app.use(bodyParser.json());

app.all("*", (req, res, next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"));
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
