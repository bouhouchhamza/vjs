import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    overview(): {
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
