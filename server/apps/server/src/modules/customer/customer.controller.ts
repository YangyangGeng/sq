import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';

@Controller('customer')
@ApiTags('微信小程序用户模块')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService
    ) {}

    @Get('getCustomerInfo/:openid')
    @ApiOperation({
        summary: '获取用户信息'
    })
    public async getCustomerInfo(@Param('openid') openid: string) {
        return await this.customerService.findOneByOpenID(openid)
    }
}
