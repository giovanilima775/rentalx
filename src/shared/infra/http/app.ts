import "reflect-metadata";
import express from 'express';
import "express-async-errors";
import createConnection from '@shared/infra/typeorm';
import "@shared/container";
import { Request, Response, NextFunction } from 'express';

import { router } from './routes/index';
import swaggerUi from 'swagger-ui-express';
import { AppError } from '@shared/errors/AppError';

createConnection("localhost");
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require('../../../swagger.json')));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) =>{
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({ status: 'error', message: `Internal server error - ${err.message}` });
});

export { app };
