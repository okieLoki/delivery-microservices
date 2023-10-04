import express, {Express} from 'express';
import {adminRoute, vendorRoute} from './routes/index'
import {dbConnect} from './config/index'

const app: Express = express();

dbConnect().catch((err)=>{
  console.error(err)
})

app.use(express.json());

app.use('/admin', adminRoute);
app.use('/vendor', vendorRoute);


app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
