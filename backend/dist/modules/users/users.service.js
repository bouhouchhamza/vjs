"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../../common/enums/role.enum");
const json_store_1 = require("../../common/storage/json-store");
let UsersService = class UsersService {
    constructor() {
        this.store = new json_store_1.JsonStore('users.json');
        this.users = this.store.read([]);
    }
    findAll() {
        return this.users.map((user) => this.toPublicUser(user));
    }
    findById(id) {
        const user = this.users.find((item) => item.id === id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    findByEmail(email) {
        return this.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
    }
    create(input) {
        const user = {
            id: `user-${Date.now()}`,
            name: input.name,
            email: input.email.toLowerCase(),
            password: input.password,
            role: input.role ?? role_enum_1.Role.User
        };
        this.users.push(user);
        this.save();
        return this.toPublicUser(user);
    }
    updatePassword(id, password) {
        const index = this.users.findIndex((user) => user.id === id);
        if (index < 0) {
            throw new common_1.NotFoundException('User not found');
        }
        this.users[index] = { ...this.users[index], password };
        this.save();
    }
    updateProfile(id, dto) {
        const index = this.users.findIndex((user) => user.id === id);
        if (index < 0) {
            throw new common_1.NotFoundException('User not found');
        }
        this.users[index] = { ...this.users[index], ...dto };
        this.save();
        return this.toPublicUser(this.users[index]);
    }
    toPublicUser(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address
        };
    }
    save() {
        this.store.write(this.users);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map