import express from "express";
import cookieParser from "cookie-parser";
import { dependencies } from "@/_boot/dependencies";
import { routes } from "@/infrastructure/routes";
import { errorHandler } from "@intellectaa/common";
import { sockerHandler } from "@/infrastructure/socketHandler/socket.handler";
import http from "http";
import cors from "cors";
const app = express();

app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

const corsOptions = {
  origin: ["http://localhost:3000"],

  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/chat",routes(dependencies));
app.use(cors(corsOptions));
app.use(errorHandler);
app.get("/", (req: any, res) => {
  res.status(200).json({
    message: "chat service ON!",
  });
});

const server = http.createServer(app);
sockerHandler(server);
export default server;
