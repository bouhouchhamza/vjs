import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
export declare class AdminService {
    private readonly productsService;
    private readonly categoriesService;
    private readonly ordersService;
    private readonly usersService;
    constructor(productsService: ProductsService, categoriesService: CategoriesService, ordersService: OrdersService, usersService: UsersService);
    getOverview(): {
        stats: {
            revenue: number;
            orders: number;
            products: number;
            customers: number;
            categories: number;
        };
        recentOrders: import("../orders/entities/order.entity").Order[];
        lowStock: import("../products/entities/product.entity").Product[];
    };
}
