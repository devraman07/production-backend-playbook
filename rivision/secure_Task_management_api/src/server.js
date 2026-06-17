import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { AuthRouter } from "./features/auth/routes/authroute.js";
import { userRouter } from "./features/users/routes/userRoutes.js";

dotenv.config();

const app = express();


const port = 3000;

app.use(express.json());
app.use(cookieParser());


app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    cookie : {
        httpOnly : true,
        maxAge : 1000 * 60 * 60 * 24
    }
}))


app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
    res.send("Task management api working");
});


app.listen(port, () => {
    console.log(`server is running on localhost://${port}`);
})