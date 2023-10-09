import 'dotenv/config';
import express, {Express} from 'express';
import {adminRoute, vendorRoute} from './routes/index'
import {dbConnect} from './config/index'
import path from 'path';

const app: Express = express();


dbConnect()

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/admin', adminRoute);
app.use('/vendor', vendorRoute);


const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
