import express from "express";
import { about, getAllProducts, getPaginatedProducts, getproductById, SearchProduct } from "../controllers/prouctController.js";

 export const ProductRouter = express.Router();

ProductRouter.get("/", getAllProducts );
ProductRouter.get("/about",about );
ProductRouter.get("/paginated", getPaginatedProducts);
ProductRouter.get("/search", SearchProduct);
ProductRouter.get("/:id", getproductById);
