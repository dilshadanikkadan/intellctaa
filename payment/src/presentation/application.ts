import express, { Application } from "express";
import  cookieParser from "cookie-parser";
import { dependencies } from "@/_boot/dependencies";
import { routes } from "@/infrastructure/routes";
import { errorHandler } from "@intellectaa/common";
import bodyParser from "body-parser";

const app: Application = express();
app.use(
  "/api/payment/webhook",
  bodyParser.raw({ type: "application/json" })
);
app.use((req, res, next) => {
  if (req.originalUrl === '/api/payment/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/payment",routes(dependencies));
app.use(errorHandler);
app.get("/", (req: any, res) => {
  res.status(200).json({
    message: "auth service ON!",
  });
});
export default app;
