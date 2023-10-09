import 'dotenv/config';
import express, {Express} from 'express';
import {expressApp, dbConnect} from './services/index';


const startServer = async () => {
  const app: Express = express();

  await dbConnect();

  await expressApp(app);

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

}

startServer();