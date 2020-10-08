import 'dotenv/config';
import 'reflect-metadata';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import AppError from './app/errors/appError';

import routes from './routes';
import './database';

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

app.listen(PORT, () => console.log(`🚀 Server is now running on *:${PORT}`));
