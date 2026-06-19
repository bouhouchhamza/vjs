import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const header = request.headers.authorization as string | undefined;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;

    if (token) {
      request.user = this.authService.verifyToken(token);
    }

    return true;
  }
}
