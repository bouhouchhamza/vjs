import { AuthUser } from '../../common/types/auth-user.type';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Order } from './entities/order.entity';
export declare class OrdersService {
    private readonly productsService;
    private readonly store;
    private orders;
    constructor(productsService: ProductsService);
    findAll(): Order[];
    findByUser(userId: string): Order[];
    findOne(id: string): Order;
    findOneForUser(id: string, user: AuthUser): Order;
    create(dto: CreateOrderDto, userId?: string): Order;
    updateStatus(id: string, dto: UpdateOrderStatusDto): Order;
    private createWhatsappUrl;
    private save;
}
