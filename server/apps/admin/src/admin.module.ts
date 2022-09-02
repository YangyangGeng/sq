import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    DbModule,
    UserModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
