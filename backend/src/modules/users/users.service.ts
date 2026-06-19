import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '../../common/enums/role.enum';
import { JsonStore } from '../../common/storage/json-store';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PublicUser, User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly store = new JsonStore<User[]>('users.json');
  private users: User[] = this.store.read([]);

  findAll(): PublicUser[] {
    return this.users.map((user) => this.toPublicUser(user));
  }

  findById(id: string): User {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  }

  create(input: { name: string; email: string; password: string; role?: Role }): PublicUser {
    const user: User = {
      id: `user-${Date.now()}`,
      name: input.name,
      email: input.email.toLowerCase(),
      password: input.password,
      role: input.role ?? Role.User
    };
    this.users.push(user);
    this.save();
    return this.toPublicUser(user);
  }

  updatePassword(id: string, password: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index < 0) {
      throw new NotFoundException('User not found');
    }
    this.users[index] = { ...this.users[index], password };
    this.save();
  }

  updateProfile(id: string, dto: UpdateProfileDto): PublicUser {
    const index = this.users.findIndex((user) => user.id === id);
    if (index < 0) {
      throw new NotFoundException('User not found');
    }
    this.users[index] = { ...this.users[index], ...dto };
    this.save();
    return this.toPublicUser(this.users[index]);
  }

  toPublicUser(user: User): PublicUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address
    };
  }

  private save(): void {
    this.store.write(this.users);
  }
}
