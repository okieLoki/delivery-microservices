import { Response } from 'express';

const handleErrors = (error: any, res: Response) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    return res.status(statusCode).json({
        status: 'Error',
        message: message
    });
};

export { handleErrors }