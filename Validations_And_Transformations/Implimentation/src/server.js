import express from 'express';
import { userRouter } from './modules/users/route/userRoutes.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();



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
}));


app.use("/api/users", userRouter);



app.get("/", (req, res) => {
    res.send("validations api connected");
});



app.listen(3000, () => {
    console.log("server is running on port 3000");
});