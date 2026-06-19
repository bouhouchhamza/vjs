export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    categoryId: string;
    image: string;
    gallery: string[];
    rating: number;
    reviewCount: number;
    stock: number;
    featured: boolean;
    tags: string[];
}
