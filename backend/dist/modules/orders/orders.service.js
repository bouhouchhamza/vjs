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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../../common/enums/role.enum");
const json_store_1 = require("../../common/storage/json-store");
const products_service_1 = require("../products/products.service");
let OrdersService = class OrdersService {
    constructor(productsService) {
        this.productsService = productsService;
        this.store = new json_store_1.JsonStore('orders.json');
        this.orders = this.store.read([]);
    }
    findAll() {
        return [...this.orders].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    }
    findByUser(userId) {
        return this.findAll().filter((order) => order.userId === userId);
    }
    findOne(id) {
        const order = this.orders.find((item) => item.id === id);
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
    findOneForUser(id, user) {
        const order = this.findOne(id);
        if (user.role !== role_enum_1.Role.Admin && order.userId !== user.id) {
            throw new common_1.ForbiddenException('You do not have access to this order');
        }
        return order;
    }
    create(dto, userId) {
        const items = dto.items.map((item) => {
            const product = this.productsService.findOne(item.productId);
            return {
                productId: product.id,
                name: product.name,
                quantity: item.quantity,
                price: product.price
            };
        });
        this.productsService.reserveStock(items);
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = subtotal > 100 ? 0 : 9.9;
        const tax = Number((subtotal * 0.08).toFixed(2));
        const order = {
            ...dto,
            id: `order-${Date.now()}`,
            userId,
            items,
            status: 'pending',
            paymentStatus: dto.paymentMethod === 'whatsapp' || dto.paymentMethod === 'bank' ? 'pending' : 'unpaid',
            subtotal,
            shipping,
            tax,
            total: Number((subtotal + shipping + tax).toFixed(2)),
            whatsappUrl: dto.paymentMethod === 'whatsapp' ? this.createWhatsappUrl(dto.customer.name, items, subtotal) : undefined,
            createdAt: new Date().toISOString()
        };
        this.orders.unshift(order);
        this.save();
        return order;
    }
    updateStatus(id, dto) {
        const index = this.orders.findIndex((order) => order.id === id);
        if (index < 0) {
            throw new common_1.NotFoundException('Order not found');
        }
        this.orders[index] = { ...this.orders[index], status: dto.status };
        this.save();
        return this.orders[index];
    }
    createWhatsappUrl(customerName, items, subtotal) {
        const phone = process.env.WHATSAPP_PHONE;
        if (!phone) {
            return undefined;
        }
        const summary = items.map((item) => `${item.quantity} x ${item.name}`).join(', ');
        const message = `New order from ${customerName}: ${summary}. Subtotal: ${subtotal.toFixed(2)}`;
        return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    }
    save() {
        this.store.write(this.orders);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map