import jwt from 'jsonwebtoken';

import { env } from '../../environment';

export function isAuthenticated(req: any, res: any, next: any) {
  try {
    let token = req.get('authorization');
    if (!token) {
      return res.status(403).json({ message: 'Token not found.' });
    }

    const accessToken = token.split(' ')[1];
    const decoded: any = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);

    if (!decoded.name) {
      throw new Error('Token not valid.');
    }

    req.email = decoded.name;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

export function verifyRefreshToken(email: string, refreshToken: string) {
  try {
    const decoded: any = jwt.verify(refreshToken, env.ACCESS_TOKEN_REFRESH_SECRET);

    return decoded.name === email;
  } catch {
    return false;
  }
}
