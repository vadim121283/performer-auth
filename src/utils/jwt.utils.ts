import { sign, SignOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import { config } from '../config';
import { User } from '../domain/entity/User';
import { TokenPayload } from '../domain/entity/TokenPayload';

export function generateToken(user: User) {
  const payload: TokenPayload = {
    guid: user.guid,
    login: user.login,
    role: user.role,
    team: user.team,
    accessTypes: user.accessTypes,
  };

  const privateKey = fs.readFileSync(
    path.join(__dirname, './../../../private.key')
  );

  const signInOptions: SignOptions = {
    algorithm: 'RS256',
    expiresIn: config.expiresIn,
  };

  return sign(payload, privateKey, signInOptions);
}
