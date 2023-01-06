import { Router } from 'express';

import { getUserByEmail, createUser, loginUser, handleRefreshToken } from './auth.service';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const user = await getUserByEmail(body.email);

    if (user) {
      res.status(409);
      res.json({ message: 'Użytkownik z podanym adresem email już istnieje.' });
      return;
    }

    const isUserCreated = await createUser({
      email: body.email,
      password: body.password
    });

    if (isUserCreated) {
      res.json({ message: 'Użytkownik został utworzony poprawnie.' });
      return;
    }

    res.status(500);
    res.json({
      message: 'Wystąpił błąd podczas tworzenia użytkownika. Proszę, spróbuj ponownie później.'
    });
  } catch (error) {
    res.status(500);
    res.json({ message: error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const body = req.body;

    const tokens = await loginUser({
      email: body.email,
      password: body.password
    });

    if (tokens.message) {
      res.status(tokens.status);
      res.json({ message: tokens.message });
      return;
    }

    res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });
  } catch (error) {
    res.status(500);
    res.json({ message: error });
  }
});

router.post('/refresh-token', async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const email = req.body.email;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token jest wymagany do autoryzacji.' });
  }

  if (!email) {
    return res.status(401).json({ message: 'Użytkownik jest wymagany do autoryzacji.' });
  }

  const refreshResponse = handleRefreshToken(email, refreshToken);

  if (refreshResponse.message) {
    res.status(refreshResponse.status);
    res.json({ message: refreshResponse.message });
    return;
  }

  return res.json({ accessToken: refreshResponse.accessToken });
});

export default router;
