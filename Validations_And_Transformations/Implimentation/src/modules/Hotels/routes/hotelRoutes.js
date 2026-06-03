import express from "express";
import {createNewHotel, getAllHotels, getSingleHotel} from "../controllers/hotelController.js";
import {hotelTransformer} from "../transformers/hotelTransformer.js";
import {createHotelValidation} from "../validators/hotelValidator.js";
import {requireRoles} from "../../../middlewares/requireRole.js";
import {requireAuth} from "../../../middlewares/requireAuth.js";
import { hotelqueryTransformer } from "../transformers/hotelQueryTransformer.js";

export const hotelRouter = express.Router();

hotelRouter.post("/create-hotel", requireAuth, requireRoles("admin"), hotelTransformer, createHotelValidation, createNewHotel);
hotelRouter.get("/", hotelqueryTransformer, hotelTransformer,  getAllHotels);
hotelRouter.get("/:id", getSingleHotel);
