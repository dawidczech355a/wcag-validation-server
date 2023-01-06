import { Router } from 'express';

import { isAuthenticated } from '../../shared/isAuthenticated';

const router = Router();

router.get('/', isAuthenticated, async (req, res) => {
  res.json({ message: 'Udało się zwrócić dane z endpointu.' });
});

export default router;
