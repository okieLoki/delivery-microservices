import express, {Express} from 'express';
import {adminRoute, vendorRoute} from './routes/index'

const app: Express = express();

app.use('/admin', adminRoute);
app.use('/vendor', vendorRoute);


app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
