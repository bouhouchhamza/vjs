import { IsIn } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class UpdateOrderStatusDto {
  @IsIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
  status!: OrderStatus;
}
