export declare class CreateProductDto {
    name: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    categoryId: string;
    image: string;
    gallery: string[];
    stock: number;
    featured?: boolean;
    tags?: string[];
}
