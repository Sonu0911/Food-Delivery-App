import express from "express";
const router = express.Router();
import * as fav from "../controller/favController";

router.post("/addFavFood",fav.addFav)

router.get("/favFoods/:userId",fav.getFavFoods)

router.delete("/deleteFavFood/:favFoodId",fav.deleteFavFood)

export default router