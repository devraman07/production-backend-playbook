import express from "express";
import Router from "./Product/ProductRoute.js";
import { dataLogger } from "./midilewares/dataLogger.js";
import { contentCheck } from "./midilewares/contentCheck.js";
import { contentNegotiation } from "./midilewares/Negotiation.js";

const app = express();

app.use(express.json({ limit: "1mb" }));

app.use(dataLogger);
app.use(contentCheck);
app.use(contentNegotiation);

app.use("/api/products", Router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    data: null,
    error: "Route not found",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
