import express, { NextFunction, Request, Response } from 'express';
import { authenticate } from '../middlewares/authenticate';
import postRouter from './post';
import authRouter from './auth';

export const routes = express.Router();

routes.get('/health', (req: Request, res: Response, next: NextFunction) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});



routes.use('/posts', postRouter)
routes.use('/auth', authRouter)

export default routes