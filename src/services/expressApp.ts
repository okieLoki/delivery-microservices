import express, { Express } from 'express';
import {
    adminRoute,
    vendorRoute,
    shoppingRoute
} from '../routes/index'
import path from 'path';


const expressApp = async (app: Express) => {

    app.use(express.json());
    app.use('/images', express.static(path.join(__dirname, 'images')))

    app.use('/admin', adminRoute);
    app.use('/vendor', vendorRoute);
    app.use('/food', shoppingRoute);

    return app
}

export { expressApp }