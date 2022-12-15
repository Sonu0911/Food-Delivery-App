import express from 'express';
import * as restroController from '../controller/restaurantController'
import router from './userRoute';
const routers = express.Router();


// 1. Add the restaurant;

routers.post("/addRestro",restroController.addRestaurant)

//2. Get the restaurant;
routers.get("/getById/:restroId",restroController.getRestaurantById)

//3. Get the all restaurant;
routers.get("/getAllRestro",restroController.getAllRestro)

// 4. upload the photo 
//routers.post("/upload",restroController.restroImage)

// 5. get the restro with the help of city;
routers.get("/getByCity/:city",restroController.getRestroByCity)


export default routers