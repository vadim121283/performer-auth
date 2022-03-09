export interface TokenPayload {
  guid: string;
  login: string;
  role: string;
  team: string;
  accessTypes: string[];
  iat?: number;
  exp?: number;
}
