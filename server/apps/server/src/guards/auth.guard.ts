import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPass = this.reflector.getAllAndOverride('isPass', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (isPass) return true;

    return super.canActivate(context)
  }
}