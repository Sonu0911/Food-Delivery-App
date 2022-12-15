import express from 'express';
import * as reviewController from '../controller/reviewController'
const router = express.Router();

// 1. add review 
router.post("/review/:userId/:restroId",reviewController.addReview)

// 2. update that review;
router.put("/updateReview/:restroId/:reviewId",reviewController.updateReview)

// 3. delete the review;
router.put("/reviewDelete/:restroId/:reviewId",reviewController.deleteReview)

export default router