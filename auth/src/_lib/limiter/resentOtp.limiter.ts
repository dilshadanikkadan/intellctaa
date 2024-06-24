import { BadRequestError } from '@intellectaa/common';
import rateLimit from 'express-rate-limit';

const limitHandler = (req, res, next, options) => {
    throw new  BadRequestError("Too many requests, please try again later.")
  };
export const resentOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  
  max: 3,  
  handler:limitHandler,
  statusCode: 429,
});
//