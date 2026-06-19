import { AuthUser } from '../../common/types/auth-user.type';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    me(user: AuthUser): import("./entities/user.entity").PublicUser;
    updateMe(user: AuthUser, dto: UpdateProfileDto): import("./entities/user.entity").PublicUser;
    findAll(): import("./entities/user.entity").PublicUser[];
}
