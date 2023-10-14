import express, {Router} from 'express';

const router: Router = express.Router();

router.post('/signup')
router.post('/login')


router.patch('/verify')
router.get('/otp')
router.get('/profile')
router.patch('/profile')


export {router as customerRoute}