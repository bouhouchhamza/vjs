import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): import("./entities/category.entity").Category[];
    findOne(id: string): import("./entities/category.entity").Category;
    create(dto: CreateCategoryDto): import("./entities/category.entity").Category;
    update(id: string, dto: UpdateCategoryDto): import("./entities/category.entity").Category;
    remove(id: string): {
        success: boolean;
    };
}
