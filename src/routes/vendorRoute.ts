import express, { Router } from 'express';
import {
    getVendorProfile,
    updateVendorProfile,
    updateVendorService,
    updateVendorCoverImage,
    vendorLogin,
    getFoods,
    addFood
} from '../controllers';
import { authenticate } from '../middleware/index'
import multer from 'multer';
import {v4 as uuidv4} from 'uuid';

const router: Router = express.Router();

const imageStore = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + file.originalname.split(' ').join(''))
    }
})

const images = multer({ storage: imageStore }).array('images', 10)

router.post('/login', vendorLogin)

router.use(authenticate)
router.get('/profile', getVendorProfile)
router.patch('/profile', updateVendorProfile)
router.patch('/profile/cover', images, updateVendorCoverImage)
router.patch('/service', updateVendorService)

router.post('/food', images, addFood)
router.get('/foods', getFoods)

export { router as vendorRoute }