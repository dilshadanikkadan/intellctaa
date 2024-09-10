import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import proxy from "express-http-proxy";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT; 
const corsOptions = {
  origin: [ "https://intellectaa-front-end.vercel.app"],

credentials: true,
methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", proxy("https://intellectaa-auth-latest.onrender.com/"));
app.use("/api/user", proxy("https://intellectaa-user-latest.onrender.com/"));
app.use("/api/code", proxy("https://intellectaa-code-latest.onrender.com/"));
app.use("/api/course", proxy("https://intellectaa-course-latest.onrender.com/"));
app.use("/api/payment", proxy("https://intellectaa-payment-latest.onrender.com/"));
app.use("/api/chat", proxy("https://intellectaa-chat-latest.onrender.com/"));

app.listen(PORT, () => {
  console.log(`The gateway is listening to the port ${PORT}`);
});
