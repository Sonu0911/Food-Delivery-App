import * as bestOffer from "../controller/bestOffers";
import express from "express";
const bestOfferRouter = express.Router()

bestOfferRouter.post("/addingOffers",bestOffer.addBestOffers)
bestOfferRouter.get("/bestOffers/:userId",bestOffer.getOfferList)

export default bestOfferRouter 