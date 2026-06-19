import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
export declare class CategoriesService {
    private readonly store;
    private categories;
    findAll(): Category[];
    findOne(idOrSlug: string): Category;
    create(dto: CreateCategoryDto): Category;
    update(id: string, dto: UpdateCategoryDto): Category;
    remove(id: string): void;
    private save;
}
