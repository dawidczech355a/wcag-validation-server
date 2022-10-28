import { Router } from 'express';
import { getJSDOMFromUrl } from './validation.service';

const router = Router();

router.get('/', async (req, res) => {
  const lol = await getJSDOMFromUrl();
  res.send(lol);
});

export default router;
