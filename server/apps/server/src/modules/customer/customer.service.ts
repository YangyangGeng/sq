import { Customer } from '@libs/db/schemas/customer.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel('CUSTOMER_MODEL') private readonly customerModel: Model<Customer>
    ) {}

    public async findOneByOpenID(openid: string) {
        return await this.customerModel.findOne({ openid });
    }
}