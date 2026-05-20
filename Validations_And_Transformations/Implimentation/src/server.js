import express from 'express';
import { userRouter } from './modules/users/route/userRoutes.js';



const app = express();



app.use(express.json());


app.use("/api/users", userRouter);



app.get("/", (req, res) => {
    res.send("validations api connected");
});



app.listen(3000, () => {
    console.log("server is running on port 3000");
});