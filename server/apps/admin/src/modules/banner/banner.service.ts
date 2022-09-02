import { IResponse } from '@libs/db/interface/respones.interface';
import { Banner } from '@libs/db/schemas/banner.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BannerService {
    private response: IResponse;
    constructor(
        @InjectModel('BANNER_MODEL') private readonly bannerModel: Model<Banner>
    ) {}

    public async list(pageSize: number, currentPage: number, params: any) {
        try {
            const queryParams = {} as any;
            Object.keys(params).forEach((key) => {
                if (params[key]) {
                  queryParams[key] = params[key]; // 所有字段反对含糊查问、%%之间不能有空格
                }
            });
            const total:number = await this.bannerModel.countDocuments(queryParams)
            await this.bannerModel.find(queryParams)
            .skip(currentPage ? pageSize * (currentPage - 1) : 0)
            .limit(pageSize).then(res => {
                this.response = {
                    success: true,
                    msg: {
                        list: res,
                        total,
                    }
                }
            })
            return this.response;
        } catch (error) {
            return this.response = { success: false, msg: '获取banner列表失败' }
        }
    }

    // 添加banner
    public async create(banner: Banner) {
        try {
            const createBanner = new this.bannerModel(banner)
            createBanner.save();
            this.response = {
                success: true,
                msg: '创建banner成功！' 
            }
            return this.response;
        } catch (error) {
            this.response = {
                success: false,
                msg: '创建banner失败，请联系相关人员' + error
            }
            throw this.response
        }
    }

    public async update(banner: Banner, id: string) {
        return await this.bannerModel.updateOne({ _id: id }, banner)
        .then(() => {
            return this.response = {
                success: true,
                msg: '修改成功！'
            }
        })
    }
}

