import { AuthUser } from '../../common/types/auth-user.type';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    verifyToken(token: string): AuthUser;
    private createToken;
    private passwordMatches;
    private isValidSignature;
    private sign;
    private get jwtSecret();
}
