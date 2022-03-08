import { sign } from 'jsonwebtoken';
import { User } from '../domain/entity/User';
import { config } from '../config';

export function generateToken(user: User) {
  const payload = {
    guid: user.guid,
    role: user.role,
    team: user.team,
  };

  return sign(payload, config.tokenKey);
}
