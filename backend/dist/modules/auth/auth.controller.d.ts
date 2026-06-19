import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): {
        user: import("../users/entities/user.entity").PublicUser;
        accessToken: string;
    };
    login(dto: LoginDto): {
        user: import("../users/entities/user.entity").PublicUser;
        accessToken: string;
    };
    logout(): {
        success: boolean;
    };
}
