import express from 'express';
import * as bestChoicesController from '../controller/bestChoices&TodaysSController'
const bestChoicesRouter = express.Router();

// 1. best choices
bestChoicesRouter.post("/addBestChoices",bestChoicesController.bestChoices)
bestChoicesRouter.get("/getBestChoice/:userId",bestChoicesController.getBestChoicesForUser)

// 2. Today's special
bestChoicesRouter.post("/addTodaySpecial",bestChoicesController.addTodaySpecial)
bestChoicesRouter.get("/getTodaySpecial/:userId",bestChoicesController.getTodaySpecialForUser)


export default bestChoicesRouter