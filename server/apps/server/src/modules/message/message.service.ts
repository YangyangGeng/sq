import { IWXResponse } from '@libs/db/interface/wx.respones.interface';
import { Category } from '@libs/db/schemas/category.schema';
import { Customer } from '@libs/db/schemas/customer.schema';
import { Message } from '@libs/db/schemas/message.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
    private response: IWXResponse;
    constructor(
        @InjectModel('MESSAGE_MODEL') private readonly messageModel: Model<Message>,
        @InjectModel('CATEGORY_MODEL') private readonly categoryModel: Model<Category>,
        @InjectModel('CUSTOMER_MODEL') private readonly customerModel: Model<Customer>
    ) {}

    public async list(pageSize: number, currentPage: number, params: any) {
        try {
            const queryParams = {} as any;
            Object.keys(params).forEach((key) => {
                if (params[key]) {
                  queryParams[key] = params[key]; // 所有字段反对含糊查问、%%之间不能有空格
                }
            });
            // const categories = await this.categoryModel.find({ isDel: 0 }, { isDel: 0, __v: 0, url: 0, pid: 0, status: 0 });
            // console.log('categoryAll：', categories);
            const total:number = await this.messageModel.countDocuments(queryParams)
            await this.messageModel.find(queryParams, {__v: 0})
            .skip(currentPage ? pageSize * (currentPage - 1) : 0)
            .limit(pageSize).populate([{
                path: 'childCategory',
                model: this.categoryModel,
                select: '_id name'
            },{
                path: 'customer',
                model: this.customerModel,
                select: '_id nickName avatar'
            }])
            .then(res => {
                this.response = {
                    success: true,
                    data: {
                        list: res,
                        total,
                    },
                    msg: '获取数据成功'
                }
            })
            return this.response;
        } catch (error) {
            return this.response = { success: false, msg: '获取消息列表失败' }
        }
    }

    // 添加发布信息，进入审核状态
    public async create(message: Message) {
        try {
            const createMessage = new this.messageModel(message)
            return await createMessage.save().then(res => {
                if (!res._id) {
                    throw res;
                }
                return this.response = {
                    success: true,
                    msg: '发布消息成功！'
                }
            }).catch((error) => {
                this.response = {
                    success: false,
                    msg: error._message
                }
                return this.response
            });
        } catch (error) {
            this.response = {
                success: false,
                msg: '创建发布消息失败，请联系相关人员' + error
            }
            throw this.response
        }
    }

    public async update(message: Message, id: string) {
        try {
            const { customer } = message;
            const dbMessage = await this.findOne(id);

            if (dbMessage._id !== customer) {
                throw {
                    success: false,
                    msg: '只能本人修改'
                }
            }
            return await this.messageModel.updateOne({ _id: id }, message)
            .then(() => {
                return this.response = {
                    success: true,
                    msg: '修改发布消息成功！'
                }
            })
        } catch (error) {
            return error;
        }
    }

    public async findOne(id: string) {
        return await this.messageModel.findById({ _id: id });
    }
}
