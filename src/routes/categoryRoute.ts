import express from 'express';
import * as categoryController from '../controller/categoryController'
const categoryRouter = express.Router();


// 1. create the category
categoryRouter.post("/createCategory", categoryController.createCategory)

// 2. get the categories;
categoryRouter.get("/getCategory", categoryController.getCategory)

//3. delete the category;
categoryRouter.delete("/deleteCategory/:categoryId", categoryController.deleteCategory)

export default categoryRouter