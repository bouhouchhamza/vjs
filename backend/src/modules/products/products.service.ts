import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JsonStore } from '../../common/storage/json-store';
import { sortByKey } from '../../common/utils/filter-sort';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly store = new JsonStore<Product[]>('products.json');
  private products: Product[] = this.store.read([]);

  findAll(query: ProductQueryDto = {}) {
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
      items = sortByKey(items, query.sortBy, query.sortDirection ?? 'asc');
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

  findFeatured(): Product[] {
    return this.products.filter((product) => product.featured);
  }

  findOne(idOrSlug: string): Product {
    const product = this.products.find((item) => item.id === idOrSlug || item.slug === idOrSlug);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  findRelated(productId: string): Product[] {
    const product = this.findOne(productId);
    return this.products.filter((item) => item.categoryId === product.categoryId && item.id !== product.id).slice(0, 4);
  }

  create(dto: CreateProductDto): Product {
    const product: Product = {
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

  update(id: string, dto: UpdateProductDto): Product {
    const index = this.products.findIndex((product) => product.id === id);
    if (index < 0) {
      throw new NotFoundException('Product not found');
    }

    this.products[index] = { ...this.products[index], ...dto };
    this.save();
    return this.products[index];
  }

  reserveStock(items: Array<{ productId: string; quantity: number }>): void {
    for (const item of items) {
      const product = this.findOne(item.productId);
      if (product.stock < item.quantity) {
        throw new BadRequestException(`${product.name} does not have enough stock`);
      }
    }

    this.products = this.products.map((product) => {
      const reserved = items.find((item) => item.productId === product.id)?.quantity ?? 0;
      return reserved > 0 ? { ...product, stock: product.stock - reserved } : product;
    });
    this.save();
  }

  remove(id: string): void {
    const exists = this.products.some((product) => product.id === id);
    if (!exists) {
      throw new NotFoundException('Product not found');
    }
    this.products = this.products.filter((product) => product.id !== id);
    this.save();
  }

  private save(): void {
    this.store.write(this.products);
  }
}
