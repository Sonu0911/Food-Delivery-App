import express from 'express';
import * as foodController from '../controller/foodController'
const foodRouter = express.Router();


// 1. adding the food;
foodRouter.post("/addFood",foodController.addingFood)

// 2. get the food;
foodRouter.get("/getFood/:foodId",foodController.getFoodByRestro)

// 3. get the list of foods;
foodRouter.get("/getFoods",foodController.getListOfFood)

// 4. food from restroId;
foodRouter.get("/get/:restroId",foodController.getFood)

// 5. delete the food;
foodRouter.delete("/deleteFood/:foodId",foodController.deleteFood)

export default foodRouter