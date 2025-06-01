import { Response, Request, NextFunction } from 'express';

export const responseWrapper = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;

  res.json = function (data) {
    return originalJson.call(this, {
      success: true,
      data,
    });
  };

  next();
};
