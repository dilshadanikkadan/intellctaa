import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import proxy from "express-http-proxy";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT; 
const corsOptions = {
  origin: [ "http://localhost:3000"],

credentials: true,
methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", proxy("http://localhost:3001/"));
app.use("/api/user", proxy("http://localhost:3004/"));
app.use("/api/course", proxy("http://localhost:3005/"));
app.use("/api/code", proxy("http://localhost:3006/"));
app.use("/product", proxy("http://localhost:3002/"));
app.use("/cart", proxy("http://localhost:3003/"));

app.listen(PORT, () => {
  console.log(`The gateway is listening to the port ${PORT}`);
});
