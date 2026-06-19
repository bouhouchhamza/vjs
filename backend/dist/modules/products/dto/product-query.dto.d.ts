export declare class ProductQueryDto {
    search?: string;
    categoryId?: string;
    sortBy?: 'price' | 'name' | 'rating';
    sortDirection?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}
