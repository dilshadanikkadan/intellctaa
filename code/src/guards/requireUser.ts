import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
  import * as jwt from 'jsonwebtoken';
  
  @Injectable()
  export class RequireUserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request: Request = context.switchToHttp().getRequest();
      const token =
        request.cookies?.token || request.headers['authorization']?.split(' ')[1];
      console.log('+++++++++++++', token);
  
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }
  
      try {
        console.log('***********************************');
        const user = jwt.verify(token, "WERTYUIOLKJHBGV");
        console.log('***********************************');
  
        console.log(user);
        console.log('***********************************');
  
        if (user) {
          request['user'] = user;
          return true;
        } else {
          throw new UnauthorizedException('User is not an admin');
        }
      } catch (err) {
        console.error('Token verification error:', err);
        throw new UnauthorizedException('Token verification failed');
      }
    }
  }
  