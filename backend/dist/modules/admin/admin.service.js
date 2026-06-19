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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("../orders/orders.service");
const products_service_1 = require("../products/products.service");
const users_service_1 = require("../users/users.service");
const categories_service_1 = require("../categories/categories.service");
let AdminService = class AdminService {
    constructor(productsService, categoriesService, ordersService, usersService) {
        this.productsService = productsService;
        this.categoriesService = categoriesService;
        this.ordersService = ordersService;
        this.usersService = usersService;
    }
    getOverview() {
        const products = this.productsService.findAll({ limit: 100 }).items;
        const orders = this.ordersService.findAll();
        const users = this.usersService.findAll();
        const revenue = orders.reduce((sum, order) => sum + order.total, 0);
        return {
            stats: {
                revenue,
                orders: orders.length,
                products: products.length,
                customers: users.filter((user) => user.role === 'user').length,
                categories: this.categoriesService.findAll().length
            },
            recentOrders: orders.slice(0, 5),
            lowStock: products.filter((product) => product.stock <= 20)
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        categories_service_1.CategoriesService,
        orders_service_1.OrdersService,
        users_service_1.UsersService])
], AdminService);
//# sourceMappingURL=admin.service.js.map