"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const json_store_1 = require("../../common/storage/json-store");
let CategoriesService = class CategoriesService {
    constructor() {
        this.store = new json_store_1.JsonStore('categories.json');
        this.categories = this.store.read([]);
    }
    findAll() {
        return this.categories;
    }
    findOne(idOrSlug) {
        const category = this.categories.find((item) => item.id === idOrSlug || item.slug === idOrSlug);
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    create(dto) {
        const category = { ...dto, id: `cat-${Date.now()}` };
        this.categories.push(category);
        this.save();
        return category;
    }
    update(id, dto) {
        const index = this.categories.findIndex((category) => category.id === id);
        if (index < 0) {
            throw new common_1.NotFoundException('Category not found');
        }
        this.categories[index] = { ...this.categories[index], ...dto };
        this.save();
        return this.categories[index];
    }
    remove(id) {
        const exists = this.categories.some((category) => category.id === id);
        if (!exists) {
            throw new common_1.NotFoundException('Category not found');
        }
        this.categories = this.categories.filter((category) => category.id !== id);
        this.save();
    }
    save() {
        this.store.write(this.categories);
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)()
], CategoriesService);
//# sourceMappingURL=categories.service.js.map