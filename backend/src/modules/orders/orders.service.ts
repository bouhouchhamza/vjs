import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '../../common/enums/role.enum';
import { JsonStore } from '../../common/storage/json-store';
import { AuthUser } from '../../common/types/auth-user.type';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  private readonly store = new JsonStore<Order[]>('orders.json');
  private orders: Order[] = this.store.read([]);

  constructor(private readonly productsService: ProductsService) {}

  findAll(): Order[] {
    return [...this.orders].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }

  findByUser(userId: string): Order[] {
    return this.findAll().filter((order) => order.userId === userId);
  }

  findOne(id: string): Order {
    const order = this.orders.find((item) => item.id === id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  findOneForUser(id: string, user: AuthUser): Order {
    const order = this.findOne(id);
    if (user.role !== Role.Admin && order.userId !== user.id) {
      throw new ForbiddenException('You do not have access to this order');
    }
    return order;
  }

  create(dto: CreateOrderDto, userId?: string): Order {
    const items = dto.items.map((item) => {
      const product = this.productsService.findOne(item.productId);
      return {
        productId: product.id,
        name: product.name,
        quantity: item.quantity,
        price: product.price
      };
    });
    this.productsService.reserveStock(items);

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 9.9;
    const tax = Number((subtotal * 0.08).toFixed(2));
    const order: Order = {
      ...dto,
      id: `order-${Date.now()}`,
      userId,
      items,
      status: 'pending',
      paymentStatus: dto.paymentMethod === 'whatsapp' || dto.paymentMethod === 'bank' ? 'pending' : 'unpaid',
      subtotal,
      shipping,
      tax,
      total: Number((subtotal + shipping + tax).toFixed(2)),
      whatsappUrl: dto.paymentMethod === 'whatsapp' ? this.createWhatsappUrl(dto.customer.name, items, subtotal) : undefined,
      createdAt: new Date().toISOString()
    };
    this.orders.unshift(order);
    this.save();
    return order;
  }

  updateStatus(id: string, dto: UpdateOrderStatusDto): Order {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index < 0) {
      throw new NotFoundException('Order not found');
    }
    this.orders[index] = { ...this.orders[index], status: dto.status };
    this.save();
    return this.orders[index];
  }

  private createWhatsappUrl(customerName: string, items: Order['items'], subtotal: number): string | undefined {
    const phone = process.env.WHATSAPP_PHONE;
    if (!phone) {
      return undefined;
    }

    const summary = items.map((item) => `${item.quantity} x ${item.name}`).join(', ');
    const message = `New order from ${customerName}: ${summary}. Subtotal: ${subtotal.toFixed(2)}`;
    return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  }

  private save(): void {
    this.store.write(this.orders);
  }
}
