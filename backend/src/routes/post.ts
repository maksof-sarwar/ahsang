import { db } from '../db';

import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.get('/public', async (req, res, next) => {
  try {
    const where = {}

    const posts = await db.post.findMany({
      where, include: {
        author: true
      }
    });
    res.json({ rows: posts, count: await db.post.count({ where }) });
  } catch (error) {
    next(error);
  }
});


router.get('/', authenticate, async (req, res, next) => {
  try {
    const where = { authorId: req.user?.id }
    const page = Number(req.query.page) || 1;
    const limit = 2;
    const skip = (page - 1) * limit;
    const posts = await db.post.findMany({
      where, include: {
        author: true
      },
      orderBy: {
        createdAt: 'desc'
      },
    });
    res.json({ rows: posts, count: await db.post.count({ where }) });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await db.post.findUnique({ where: { id, authorId: req.user?.id } });
    if (!post) {
      res.status(404).send('Post not found');
      return;
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    req.body.authorId = req.user?.id
    const post = await db.post.create({ data: req.body });
    res.json(post);
  } catch (error) {
    next(error);
  }
});


export default router;
