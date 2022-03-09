import express from 'express';
import usersJson from '../init/init-users.json';
import { config } from './config';
import { corsServer } from './data/api/middlewares/cors.middleware';
import { loggerMiddleware } from './data/api/middlewares/logger.middleware';
import { User } from './domain/entity/User';
import { generateToken } from './utils/jwt.utils';

const app = express();
const users: User[] = usersJson;

// Logger
app.use(loggerMiddleware);

// CORS
app.use(corsServer());

app.use(express.json());

app.post('/api/auth', (req, res) => {
  for (let user of users) {
    if (req.body.login === user.login && req.body.password === user.password) {
      return res.status(200).json({
        guid: user.guid,
        login: user.login,
        token: generateToken(user),
      });
    }
  }

  return res.status(404).json({ message: 'User not found' });
});

app.listen(config.port, config.host, () =>
  console.log(`Auth server listens http://${config.host}:${config.port}`)
);
