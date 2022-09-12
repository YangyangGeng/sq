import { IWXResponse } from '@libs/db/interface/wx.respones.interface';
import { City } from '@libs/db/schemas/city.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CityService {
    private response: IWXResponse;
    constructor(
        @InjectModel('CITY_MODEL') private readonly cityModel: Model<City>,
    ) {}

    public async list() {
        try {
            return await this.cityModel.find({ isDel: 0 }, { isDel: 0, __v: 0 }).then(res => {
                return this.response = {
                    success: true,
                    msg: '获取城市成功',
                    data: res
                }
            });
        } catch (error) {
            return error;
        }
    }
}