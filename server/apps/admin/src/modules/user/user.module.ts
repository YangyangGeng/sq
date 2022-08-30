import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard
  //   }
  ]
})
export class UserModule {}
