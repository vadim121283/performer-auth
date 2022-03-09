import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`LOG | ip: ${req.ip} | url: ${req.url}`);
  next();
};
