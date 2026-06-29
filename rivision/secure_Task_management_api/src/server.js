import express from "express";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { AuthRouter } from "./features/auth/routes/authroute.js";
import { userRouter } from "./features/users/routes/userRoutes.js";
import { taskRouter } from "./features/tasks/routes/task.routes.js";
import { orgRouter } from "./features/organizations/organization.routes.js";
import { memberShipRouter } from "./features/memberships/memberships.routes.js";
import { projectRouter } from "./features/projects/project.route.js";
dotenv.config();

const app = express();


const port = 3000;

app.use(express.json());
app.use(cookieParser());





app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/organizations", orgRouter);
app.use("/api/v1/memberships", memberShipRouter);
app.use("/api/v1/projects", projectRouter);

app.get("/", (req, res) => {
    res.send("Task management api working");
});


app.listen(port, () => {
    console.log(`server is running on localhost://${port}`);
})