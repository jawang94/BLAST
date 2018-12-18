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

io.on("connection", socket => {
  console.log("user connected");

  socket.on("new-message", message => {
    console.log(message);
    io.emit("emit-new-message", message);
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
