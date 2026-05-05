import express from "express";
import {
  AddProduct,
  deleteproduct,
  GetProductById,
  GetProducts,
  UpdateProduct,
} from "./ProductController.js";

const Router = express.Router();

Router.get("/", GetProducts);
Router.post("/add", AddProduct);
Router.get("/:id", GetProductById);
Router.put("/:id/update", UpdateProduct);
Router.delete("/:id/delete", deleteproduct);

export default Router;
