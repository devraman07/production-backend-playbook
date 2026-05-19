import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";

import { router } from "./modules/statefull_Auth/routes/authRoutes.js";
import { statelessAuthrouter } from "./modules/stateless_auth/routes/authroutes.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

const SESSION_SECRET= "U.^aNqcsAv4eIEo"
 const SESSION_MAX_AGE=86400000
console.log("SESSION_SECRET:", SESSION_SECRET);

app.use(
  session({
    name: "sid",

    secret: SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    rolling: true,

    cookie: {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: "strict",

      maxAge: Number(SESSION_MAX_AGE),
    },
  }),
);

app.use("/api/statefullauth", router);
app.use("/api/statelessauth", statelessAuthrouter);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Stateful auth server running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
