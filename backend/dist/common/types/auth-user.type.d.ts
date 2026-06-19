import { Role } from '../enums/role.enum';
export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: Role;
}
