import express, { Application } from "express";
import  cookieParser from "cookie-parser";
import { dependencies } from "@/_boot/dependencies";
import { routes } from "@/infrastructure/routes";
import { errorHandler } from "@intellectaa/common";

const app: Application = express();

app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes(dependencies));
app.use(errorHandler);
app.get("/", (req: any, res) => {
  res.status(200).json({
    message: "auth service ON!",
  });
});
export default app;
