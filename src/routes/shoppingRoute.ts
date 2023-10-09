import express, { Router } from 'express';
import {
    getFoodAvailability,
    getTopResturants,
    getFoodin30Mins,
    searchFoods,
    resturantById
} from '../controllers/index';

const router : Router = express.Router();

router.get('/', getFoodAvailability);
router.get('/top-resturants', getTopResturants);
router.get('/food-in-30-mins/:pincode', getFoodin30Mins);
router.get('/search/:pincode', searchFoods);
router.get('/resturant/:id', resturantById);

export { router as shoppingRoute }
