import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private readonly store;
    private products;
    findAll(query?: ProductQueryDto): {
        items: Product[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
    findFeatured(): Product[];
    findOne(idOrSlug: string): Product;
    findRelated(productId: string): Product[];
    create(dto: CreateProductDto): Product;
    update(id: string, dto: UpdateProductDto): Product;
    reserveStock(items: Array<{
        productId: string;
        quantity: number;
    }>): void;
    remove(id: string): void;
    private save;
}
