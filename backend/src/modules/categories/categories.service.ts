import { Injectable, NotFoundException } from '@nestjs/common';
import { JsonStore } from '../../common/storage/json-store';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  private readonly store = new JsonStore<Category[]>('categories.json');
  private categories: Category[] = this.store.read([]);

  findAll(): Category[] {
    return this.categories;
  }

  findOne(idOrSlug: string): Category {
    const category = this.categories.find((item) => item.id === idOrSlug || item.slug === idOrSlug);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  create(dto: CreateCategoryDto): Category {
    const category = { ...dto, id: `cat-${Date.now()}` };
    this.categories.push(category);
    this.save();
    return category;
  }

  update(id: string, dto: UpdateCategoryDto): Category {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index < 0) {
      throw new NotFoundException('Category not found');
    }

    this.categories[index] = { ...this.categories[index], ...dto };
    this.save();
    return this.categories[index];
  }

  remove(id: string): void {
    const exists = this.categories.some((category) => category.id === id);
    if (!exists) {
      throw new NotFoundException('Category not found');
    }
    this.categories = this.categories.filter((category) => category.id !== id);
    this.save();
  }

  private save(): void {
    this.store.write(this.categories);
  }
}
