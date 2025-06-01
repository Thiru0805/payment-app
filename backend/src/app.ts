import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import { FRONTEND_BASE_URL, PORT } from './config/env';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { responseWrapper } from './middlewares/responseModifier.middleware';

connectDB();

const app = express();

app.use(cors({
  origin: FRONTEND_BASE_URL, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']         
}));

app.use(express.json());
app.use(responseWrapper);

app.use('/api', routes);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(errorHandler);

const port = PORT || 6000;
app.listen(port, () => console.log(`Server started on port ${port}`));
