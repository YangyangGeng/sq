import { IResponse } from '@libs/db/interface/respones.interface';
import { City } from '@libs/db/schemas/city.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CityService {
    private response: IResponse;
    constructor(
        @InjectModel('CITY_MODEL') private readonly cityModel: Model<City>,
    ) {}

    // _id获取当城市
    public async findOneById(id: string) {
        return this.cityModel.find({ _id: id });
    }

    // 获取城市列表
    public async list() {
        const list = [];
        const allCities = await this.cityModel.find({ isDel: 0 }, { isDel: 0 });
        const parentCategories = allCities.filter(c => !c.pcid);
        parentCategories.forEach(c1 => {
            const list2 = [];
            const children2 = allCities.filter(c2 => c1._id == c2.pcid);
            children2.forEach(c3 => {
                list2.push({
                    _id: c3._id,
                    name: c3.name,
                    pcid: c3.pcid,
                    preChar: c3.preChar,
                    children: allCities.filter(c4 => c3._id == c4.pcid),
                })
            });
            list.push({
                _id: c1._id,
                name: c1.name,
                pcid: c1.pcid,
                preChar: c1.preChar,
                children: list2,
            })
        })
        return this.response = {
            success: true,
            msg: list
        };
    }

    // 添加城市
    public async create(city: City) {
        try {
            const createCategory = new this.cityModel(city)
            createCategory.save();
            this.response = {
                success: true,
                msg: '创建城市成功！' 
            }
            return this.response;
        } catch (error) {
            this.response = {
                success: false,
                msg: '创建城市失败，请联系相关人员' + error
            }
            throw this.response
        }
    }

    //编辑城市
    public async update(city: City, id: string) {
        try {
            return await this.cityModel.updateOne({ _id: id }, city)
            .then(() => {
                return this.response = {
                    success: true,
                    msg: '修改成功！'
                }
            })
        } catch (error) {
            this.response = {
                success: false,
                msg: '修改城市失败，请联系相关人员' + error
            }
            throw this.response
        }
    }

    // 删除城市
    public async delete(id: string) {
        return await this.cityModel.updateOne({ _id: id }, { $set: { isDel: 1 } })
        .then(() => {
            return this.response = {
                success: true,
                msg: '删除成功！'
            }
        })
    }
}