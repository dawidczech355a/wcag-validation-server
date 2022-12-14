import { getRepository } from 'typeorm';
import passwordCrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../../entity/user';
import { env } from '../../../environment';
import { verifyRefreshToken } from '../../shared/isAuthenticated';

export interface LoginUser {
  message?: string;
  status?: number;
  accessToken?: string;
  refreshToken?: string;
}

const saltRounds = 10;
const userRepository = () => getRepository(User);

export const generateAccessToken = (name: string): string => {
  return jwt.sign({ name }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10m'
  });
};

export async function getUserByEmail(email: string) {
  return await userRepository().findOne({ where: { email } });
}

export async function createUser({ email, password }: User) {
  try {
    await passwordCrypt.hash(password, saltRounds, async (error, hash) => {
      if (!error) {
        await userRepository().save({ email, password: hash });
      }
    });

    return true;
  } catch {
    return false;
  }
}

export async function loginUser({ email, password }: User): Promise<LoginUser> {
  const wrongCredentials = {
    message: 'Email lub hasło nieprawidłowe.',
    status: 404
  };

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return wrongCredentials;
    }

    const isPasswordValid = passwordCrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return wrongCredentials;
    }

    const accessToken = generateAccessToken(email);
    const refreshToken = jwt.sign({ name: email }, env.ACCESS_TOKEN_REFRESH_SECRET);

    return {
      accessToken,
      refreshToken
    };
  } catch {
    return {
      message: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.',
      status: 500
    };
  }
}

export function handleRefreshToken(email: string, token: string) {
  const isRefreshTokenValid = verifyRefreshToken(email, token);

  if (!isRefreshTokenValid) {
    return {
      message: 'Nie udało się odświeżyć tokenu.',
      status: 401
    };
  }

  const accessToken = generateAccessToken(email);
  return { accessToken };
}
