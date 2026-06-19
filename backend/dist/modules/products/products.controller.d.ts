import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(query: ProductQueryDto): {
        items: import("./entities/product.entity").Product[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
    featured(): import("./entities/product.entity").Product[];
    findOne(id: string): import("./entities/product.entity").Product;
    related(id: string): import("./entities/product.entity").Product[];
    create(dto: CreateProductDto): import("./entities/product.entity").Product;
    update(id: string, dto: UpdateProductDto): import("./entities/product.entity").Product;
    remove(id: string): {
        success: boolean;
    };
}
