import { Injectable } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService
  ) {}

  getOverview() {
    const products = this.productsService.findAll({ limit: 100 }).items;
    const orders = this.ordersService.findAll();
    const users = this.usersService.findAll();
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);

    return {
      stats: {
        revenue,
        orders: orders.length,
        products: products.length,
        customers: users.filter((user) => user.role === 'user').length,
        categories: this.categoriesService.findAll().length
      },
      recentOrders: orders.slice(0, 5),
      lowStock: products.filter((product) => product.stock <= 20)
    };
  }
}
