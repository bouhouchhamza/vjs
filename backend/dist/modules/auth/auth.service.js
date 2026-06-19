"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const bcrypt = require("bcryptjs");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    register(dto) {
        const existing = this.usersService.findByEmail(dto.email);
        if (existing) {
            throw new common_1.BadRequestException('Email is already registered');
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
    login(dto) {
        const user = this.usersService.findByEmail(dto.email);
        if (!user || !this.passwordMatches(dto.password, user.password)) {
            throw new common_1.UnauthorizedException('Invalid email or password');
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
    verifyToken(token) {
        try {
            const [payload, signature] = token.split('.');
            if (!payload || !signature || !this.isValidSignature(payload, signature)) {
                throw new Error('Invalid token signature');
            }
            const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
            if (!decoded.id || decoded.exp < Date.now()) {
                throw new Error('Invalid token');
            }
            return {
                id: decoded.id,
                email: decoded.email,
                name: decoded.name,
                role: decoded.role
            };
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    createToken(user) {
        const payload = Buffer.from(JSON.stringify({ ...user, exp: Date.now() + 1000 * 60 * 60 * 24 })).toString('base64url');
        return `${payload}.${this.sign(payload)}`;
    }
    passwordMatches(password, storedPassword) {
        if (storedPassword.startsWith('$2')) {
            return bcrypt.compareSync(password, storedPassword);
        }
        return storedPassword === password;
    }
    isValidSignature(payload, signature) {
        const expected = this.sign(payload);
        const expectedBuffer = Buffer.from(expected);
        const actualBuffer = Buffer.from(signature);
        return expectedBuffer.length === actualBuffer.length && (0, node_crypto_1.timingSafeEqual)(expectedBuffer, actualBuffer);
    }
    sign(payload) {
        return (0, node_crypto_1.createHmac)('sha256', this.jwtSecret).update(payload).digest('base64url');
    }
    get jwtSecret() {
        return process.env.JWT_SECRET ?? 'development-only-change-me';
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map