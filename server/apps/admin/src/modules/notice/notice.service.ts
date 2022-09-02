import { IResponse } from '@libs/db/interface/respones.interface';
import { Notice } from '@libs/db/schemas/notice.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NoticeService {
    private response: IResponse;
    constructor(
        @InjectModel('NOTICE_MODEL') private readonly noticeModel: Model<Notice>
    ) {}

    public async list(pageSize: number, currentPage: number, params: any) {
        try {
            const queryParams = {} as any;
            Object.keys(params).forEach((key) => {
                if (params[key]) {
                  queryParams[key] = params[key]; // 所有字段反对含糊查问、%%之间不能有空格
                }
            });
            const total:number = await this.noticeModel.countDocuments(queryParams)
            await this.noticeModel.find(queryParams)
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
            return this.response = { success: false, msg: '获取notice列表失败' }
        }
    }

    // 添加notice
    public async create(notice: Notice) {
        try {
            const createNotice = new this.noticeModel(notice)
            createNotice.save();
            this.response = {
                success: true,
                msg: '创建notice成功！' 
            }
            return this.response;
        } catch (error) {
            this.response = {
                success: false,
                msg: '创建notice失败，请联系相关人员' + error
            }
            throw this.response
        }
    }

    public async update(notice: Notice, id: string) {
        return await this.noticeModel.updateOne({ _id: id }, notice)
        .then(() => {
            return this.response = {
                success: true,
                msg: '修改成功！'
            }
        })
    }
}

