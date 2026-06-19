import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';
import * as bcrypt from 'bcryptjs';
import { AuthUser } from '../../common/types/auth-user.type';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  register(dto: RegisterDto) {
    const existing = this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestException('Email is already registered');
    }

    const user = this.usersService.create({
      ...dto,
      password: bcrypt.hashSync(dto.password, 12)
    });
    return {
      user,
      accessToken: this.createToken(user)
    };
  }

  login(dto: LoginDto) {
    const user = this.usersService.findByEmail(dto.email);
    if (!user || !this.passwordMatches(dto.password, user.password)) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.password.startsWith('$2')) {
      this.usersService.updatePassword(user.id, bcrypt.hashSync(dto.password, 12));
    }

    const publicUser = this.usersService.toPublicUser(user);
    return {
      user: publicUser,
      accessToken: this.createToken(publicUser)
    };
  }

  logout() {
    return { success: true };
  }

  verifyToken(token: string): AuthUser {
    try {
      const [payload, signature] = token.split('.');
      if (!payload || !signature || !this.isValidSignature(payload, signature)) {
        throw new Error('Invalid token signature');
      }

      const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as AuthUser & { exp: number };
      if (!decoded.id || decoded.exp < Date.now()) {
        throw new Error('Invalid token');
      }
      return {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private createToken(user: AuthUser): string {
    const payload = Buffer.from(JSON.stringify({ ...user, exp: Date.now() + 1000 * 60 * 60 * 24 })).toString(
      'base64url'
    );
    return `${payload}.${this.sign(payload)}`;
  }

  private passwordMatches(password: string, storedPassword: string): boolean {
    if (storedPassword.startsWith('$2')) {
      return bcrypt.compareSync(password, storedPassword);
    }

    return storedPassword === password;
  }

  private isValidSignature(payload: string, signature: string): boolean {
    const expected = this.sign(payload);
    const expectedBuffer = Buffer.from(expected);
    const actualBuffer = Buffer.from(signature);
    return expectedBuffer.length === actualBuffer.length && timingSafeEqual(expectedBuffer, actualBuffer);
  }

  private sign(payload: string): string {
    return createHmac('sha256', this.jwtSecret).update(payload).digest('base64url');
  }

  private get jwtSecret(): string {
    return process.env.JWT_SECRET ?? 'development-only-change-me';
  }
}
