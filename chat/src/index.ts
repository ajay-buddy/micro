import express from "express";
import * as http from "http";
import cors from "cors";

const port = process.env.PORT || 3001;

const app = express();
const router = express.Router();

router.get("/socket.io/", (req:any, res:any) => {
  res.send({ response: "I am alive" }).status(200);
});

app.use(cors())
app.use(router)

const server = http.createServer(app);

const io = require("socket.io")(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let interval: any;

io.on("connection", (socket: any) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket: any) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));