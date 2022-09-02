import { IResponse } from '@libs/db/interface/respones.interface';
import { Category } from '@libs/db/schemas/category.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
    private response: IResponse;
    constructor(
        @InjectModel('CATEGORY_MODEL') private readonly categoryModel: Model<Category>
    ) {}
    
    // _id获取当分类
    public async findOneById(id: string) {
        return this.categoryModel.find({ _id: id });
    }

    // 获取分类列表
    public async list() {
        const list = [];
        const allCategories = await this.categoryModel.find({ isDel: 0 }, { isDel: 0 });
        const parentCategories = allCategories.filter(c => !c.pid);
        parentCategories.forEach(c2 => {
            // const children = [];
            // allCategories.forEach(c3 => {
            //     if (c2._id == c3.pid) {
            //         children.push({ id: c3._id, name: c3.name, url: c3.url });
            //     }
            // })
            list.push({ _id: c2._id, name: c2.name, status: c2.status || 0, url: c2.url, children: allCategories.filter(c3 => c2._id == c3.pid) });
        })
        return this.response = {
            success: true,
            msg: list
        };
    }

    // 添加分类
    public async create(category: Category) {
        try {
            const createCategory = new this.categoryModel(category)
            createCategory.save();
            this.response = {
                success: true,
                msg: '创建分类成功！' 
            }
            return this.response;
        } catch (error) {
            this.response = {
                success: false,
                msg: '创建分类失败，请联系相关人员' + error
            }
            throw this.response
        }
    }

    //编辑分类
    public async update(category: Category, id: string) {
        try {
            return await this.categoryModel.updateOne({ _id: id }, category)
            .then(() => {
                return this.response = {
                    success: true,
                    msg: '修改成功！'
                }
            })
        } catch (error) {
            this.response = {
                success: false,
                msg: '修改分类失败，请联系相关人员' + error
            }
            throw this.response
        }
    }

    // 删除分类
    public async delete(id: string) {
        return await this.categoryModel.updateOne({ _id: id }, { $set: { isDel: 1 } })
        .then(() => {
            return this.response = {
                success: true,
                msg: '删除成功！'
            }
        })
    }
}
