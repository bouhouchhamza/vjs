import { Role } from '../../common/enums/role.enum';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PublicUser, User } from './entities/user.entity';
export declare class UsersService {
    private readonly store;
    private users;
    findAll(): PublicUser[];
    findById(id: string): User;
    findByEmail(email: string): User | undefined;
    create(input: {
        name: string;
        email: string;
        password: string;
        role?: Role;
    }): PublicUser;
    updatePassword(id: string, password: string): void;
    updateProfile(id: string, dto: UpdateProfileDto): PublicUser;
    toPublicUser(user: User): PublicUser;
    private save;
}
