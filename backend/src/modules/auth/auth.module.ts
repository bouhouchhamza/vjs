import { Global, Module } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { OptionalAuthGuard } from '../../common/guards/optional-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, OptionalAuthGuard, RolesGuard],
  exports: [AuthService, AuthGuard, OptionalAuthGuard, RolesGuard]
})
export class AuthModule {}
