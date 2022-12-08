import express from 'express';
import * as restroController from '../controller/restaurantController'
const routers = express.Router();


// 1. Add the restaurant;

routers.post("/addRestro",restroController.addRestaurant)

//2. Get the restaurant;
routers.get("/getById/:restroId",restroController.getRestaurantById)

//3. Get the all restaurant;
routers.get("/getAllRestro",restroController.getAllRestro)

// 4. upload the photo 
//routers.post("/upload",restroController.restroImage)

export default routers