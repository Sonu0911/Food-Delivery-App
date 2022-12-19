import * as bestOffer from "../controller/bestOffers";
import express from "express";
const bestOfferRouter = express.Router()

bestOfferRouter.post("/addingOffers",bestOffer.addBestOffers)
bestOfferRouter.get("/bestOffers/:userId",bestOffer.getOfferList)
bestOfferRouter.put("/editBestOffers/:offerId",bestOffer.editOffers)
bestOfferRouter.put("/editBestOffersMultipleProd",bestOffer.editMultipleProduct)

export default bestOfferRouter 