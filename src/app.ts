import express, { Express, Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import { errorHandler, routeNotFound } from '../src/middlewares';
import { log } from '../src/utils';
import { router } from './routes';
import { corsOptions, specs, initializeDatabase } from '../src/config/index';

import dotenv from 'dotenv';
dotenv.config();

initializeDatabase();

const app: Express = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);
app.use(cors(corsOptions));
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

app.use('/api/v1', router);
app.get('/api/v1', (req: Request, res: Response) => {
    res.json({
        message: 'I am the express API responding for Buy simply assesment',
    });
});

app.use(routeNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    log.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
