import express from 'express';
import usersJson from '../init/init-users.json';
import { config } from './config';
import { User } from './domain/entity/User';
import { generateToken } from './utils/jwt.utils';

const app = express();
const users: User[] = usersJson;

app.use(express.json());
/* app.use((req, res, next) => {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.split(' ')[1],
      config.tokenKey,
      (err, payload) => {
        if (err) next();
        else if (payload) {
          for (let user of users) {
            if (user.guid === payload.guid) {
              req.user = user;
              next();
            }
          }

          if (!req.user) next();
        }
      }
    );
  }

  next();
}); */

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

/* app.get('/user', (req, res) => {
  if (req.user) return res.status(200).json(req.user);
  else return res.status(401).json({ message: 'Not authorized' });
}); */

app.listen(config.port, config.host, () =>
  console.log(`Auth server listens http://${config.host}:${config.port}`)
);
