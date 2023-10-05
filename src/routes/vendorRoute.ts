import express, {Router} from 'express';
import { vendorLogin } from '../controllers';

const router: Router = express.Router();

router.post('/login', vendorLogin)

export {router as vendorRoute}