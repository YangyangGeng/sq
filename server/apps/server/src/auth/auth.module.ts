import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { JwtModule } from '@nestjs/jwt';
import { CustomerService } from '../modules/customer/customer.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWT_CONSTANT } from './jwt.constant';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_CONSTANT.secret
    }),
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CustomerService, JwtStrategy],
})
export class AuthModule {}
