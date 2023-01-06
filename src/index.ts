// MOJA TESTOWA STRONA: https://bit-solutions.me/
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { createConnection } from 'typeorm';

import { env } from '../environment';
import * as swaggerDocument from '../swagger.json';

import { Auth, User } from './routes';

createConnection().then(() => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // TODO: to jest linijka która uruchamia validacje WCAG która będzie dopiero robiona
  // app.use("/validation", Validation);
  app.use('/auth', Auth);
  app.use('/user', User);

  app.listen(env.PORT);
});
