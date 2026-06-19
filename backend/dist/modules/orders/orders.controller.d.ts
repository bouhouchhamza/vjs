import { AuthUser } from '../../common/types/auth-user.type';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(dto: CreateOrderDto, user?: AuthUser): import("./entities/order.entity").Order;
    findAll(): import("./entities/order.entity").Order[];
    mine(user: AuthUser): import("./entities/order.entity").Order[];
    findOne(id: string, user: AuthUser): import("./entities/order.entity").Order;
    updateStatus(id: string, dto: UpdateOrderStatusDto): import("./entities/order.entity").Order;
}
