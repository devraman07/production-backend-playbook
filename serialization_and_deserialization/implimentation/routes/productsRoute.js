import express from "express";
import { about, addProduct, desearilizeProduct, getAllProducts, getPaginatedProducts, getproductById, SearchProduct, serializeProduct } from "../controllers/prouctController.js";

 export const ProductRouter = express.Router();

ProductRouter.get("/", getAllProducts );
ProductRouter.get("/about",about );
ProductRouter.get("/serialize", serializeProduct);
ProductRouter.post("/deserialize", desearilizeProduct);
ProductRouter.get("/paginated", getPaginatedProducts);
ProductRouter.get("/search", SearchProduct);
ProductRouter.get("/:id", getproductById);
ProductRouter.post("/addProduct", addProduct);

