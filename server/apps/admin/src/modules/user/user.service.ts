import { IResponse } from '@libs/db/interface/respones.interface';
import { User } from '@libs/db/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    private response: IResponse;
    constructor(
        @InjectModel('USER_MODEL') private readonly userModel: Model<User>
    ) {}

    public async findOneByPhone(phone: string) {
        return await this.userModel.find({
            phone
        })
    }

    public async findOneById(uid: string) {
        return await this.userModel.findById({ _id: uid })
        .then(res => {
            return this.response = {
                success: true,
                msg: { uid: res._id, phone: res.phone, nickname: res.nickname }
            }
        })
    }

    public async findAll(pageSize: number, currentPage: number, params: any) {
        try {
            const queryParams = {} as any;
            console.log('params：', params);
            
            Object.keys(params).forEach((key) => {
                if (params[key]) {
                  queryParams[key] = params[key]; // 所有字段反对含糊查问、%%之间不能有空格
                }
            });
            
            const total:number = await this.userModel.countDocuments(queryParams)
            await this.userModel.find(queryParams)
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
            return this.response = { success: false, msg: '获取用户列表失败' }
        }
    }

    public async deleteUser(uid: string) {
        return await this.userModel.deleteOne({ _id: uid })
        .then(() => {
            return this.response = {
                success: true,
                msg: '删除成功！'
            }
        })
    }

    public async updateUser(user: User) {
        return await this.userModel.updateOne({ _id: user.id }, user)
        .then(() => {
            return this.response = {
                success: true,
                msg: '修改成功！'
            }
        })
    }
}

