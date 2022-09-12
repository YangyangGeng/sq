import { IWXResponse } from '@libs/db/interface/wx.respones.interface';
import { Banner } from '@libs/db/schemas/banner.schema';
import { Category } from '@libs/db/schemas/category.schema';
import { Notice } from '@libs/db/schemas/notice.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HomeService {
    private response: IWXResponse;
    constructor(
        @InjectModel('BANNER_MODEL') private readonly bannerModel: Model<Banner>,
        @InjectModel('NOTICE_MODEL') private readonly noticeModel: Model<Notice>,
        @InjectModel('CATEGORY_MODEL') private readonly categoryModel: Model<Category>,
    ) {}

    public async getHome() {
        try {
            const list = [];
            const banners = await this.bannerModel.find({ status: 1 }, { status: 0, __v: 0 });
            const notices = await this.noticeModel.find({ status: 1 }, { status: 0, __v: 0 });
            const categories = await this.categoryModel.find({ isDel: 0 }, { isDel: 0, __v: 0 });
            const parentCategories = categories.filter(c => !c.pid);
            parentCategories.forEach(c2 => {
                list.push({ _id: c2._id, name: c2.name, status: c2.status || 0, url: c2.url, children: categories.filter(c3 => c2._id == c3.pid) });
            })
            this.response = {
                success: true,
                msg: '获取数据成功',
                data: {
                    banners,
                    notices,
                    categories: list
                }
            }
            return this.response;
        } catch (error) {
            return error
        }
    }
}