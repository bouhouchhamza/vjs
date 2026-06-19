"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const json_store_1 = require("../../common/storage/json-store");
const filter_sort_1 = require("../../common/utils/filter-sort");
let ProductsService = class ProductsService {
    constructor() {
        this.store = new json_store_1.JsonStore('products.json');
        this.products = this.store.read([]);
    }
    findAll(query = {}) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 12;
        let items = [...this.products];
        if (query.search) {
            const term = query.search.toLowerCase();
            items = items.filter((product) => {
                return [product.name, product.description, ...product.tags].join(' ').toLowerCase().includes(term);
            });
        }
        if (query.categoryId) {
            items = items.filter((product) => product.categoryId === query.categoryId);
        }
        if (query.sortBy) {
            items = (0, filter_sort_1.sortByKey)(items, query.sortBy, query.sortDirection ?? 'asc');
        }
        const total = items.length;
        const start = (page - 1) * limit;
        return {
            items: items.slice(start, start + limit),
            meta: {
                page,
                limit,
                total,
                totalPages: Math.max(1, Math.ceil(total / limit))
            }
        };
    }
    findFeatured() {
        return this.products.filter((product) => product.featured);
    }
    findOne(idOrSlug) {
        const product = this.products.find((item) => item.id === idOrSlug || item.slug === idOrSlug);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    findRelated(productId) {
        const product = this.findOne(productId);
        return this.products.filter((item) => item.categoryId === product.categoryId && item.id !== product.id).slice(0, 4);
    }
    create(dto) {
        const product = {
            ...dto,
            id: `prod-${Date.now()}`,
            rating: 0,
            reviewCount: 0,
            featured: dto.featured ?? false,
            tags: dto.tags ?? []
        };
        this.products.unshift(product);
        this.save();
        return product;
    }
    update(id, dto) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index < 0) {
            throw new common_1.NotFoundException('Product not found');
        }
        this.products[index] = { ...this.products[index], ...dto };
        this.save();
        return this.products[index];
    }
    reserveStock(items) {
        for (const item of items) {
            const product = this.findOne(item.productId);
            if (product.stock < item.quantity) {
                throw new common_1.BadRequestException(`${product.name} does not have enough stock`);
            }
        }
        this.products = this.products.map((product) => {
            const reserved = items.find((item) => item.productId === product.id)?.quantity ?? 0;
            return reserved > 0 ? { ...product, stock: product.stock - reserved } : product;
        });
        this.save();
    }
    remove(id) {
        const exists = this.products.some((product) => product.id === id);
        if (!exists) {
            throw new common_1.NotFoundException('Product not found');
        }
        this.products = this.products.filter((product) => product.id !== id);
        this.save();
    }
    save() {
        this.store.write(this.products);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map