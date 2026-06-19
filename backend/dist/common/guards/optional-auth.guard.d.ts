import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';
export declare class OptionalAuthGuard implements CanActivate {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): boolean;
}
