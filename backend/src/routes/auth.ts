import { compare, hash } from 'bcryptjs';
import { NextFunction, Request, Response, Router } from 'express';
import { sign } from 'jsonwebtoken';
import { db } from '../db';

const router = Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }
    const user = await db.user.create({ data: { name, email, password: await hash(password, 10) } });
    const token = sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name, email } });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findUnique({ where: { email }, select: { password: true, id: true, name: true } });
    console.log(user)
    if (!user || !(await compare(password, user.password))) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const token = sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, email } });
  } catch (error) {
    next(error);
  }
});

export default router;
