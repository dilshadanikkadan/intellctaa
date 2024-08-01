import express, { Application } from "express";
import  cookieParser from "cookie-parser";
import { dependencies } from "../_boot/dependencies";
import { routes } from "../infrastructure/routes";
import { errorHandler } from "@intellectaa/common";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use( "/api/auth",routes(dependencies));
app.use(errorHandler);
app.get("/", (req: any, res) => {
  res.status(200).json({
    message: "auth service is ready to begin ",
  });
});
export default app;
