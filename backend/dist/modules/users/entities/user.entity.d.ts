import { Role } from '../../../common/enums/role.enum';
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    phone?: string;
    address?: string;
}
export type PublicUser = Omit<User, 'password'>;
