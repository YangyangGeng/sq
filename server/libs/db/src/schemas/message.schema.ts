import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
    @Prop({ required: true, type: Types.ObjectId, ref: 'Customer' })
    @ApiProperty({
        description: '用户登录ID',
        example: '63296d20c050894fcabed083',
    })
    customer: string

    @Prop({ required: true, default: 2 })
    @ApiProperty({
        description: '0: 下线 1：上线 2：审核中',
        example: 2,
    })
    status: number

    @Prop({ required: true, type: Types.ObjectId, ref: 'City' })
    @ApiProperty({
        description: '管理城市ID',
        example: '631b1445a16fa792b28a5a2a',
    })
    city: string

    @Prop({ required: true, type: Types.ObjectId, ref: 'Category' })
    @ApiProperty({
        description: '分类ID',
        example: '63102ee7fd6bb19182ce4e73',
    })
    category: string

    @Prop({ required: true, type: Types.ObjectId, ref: 'Category' })
    @ApiProperty({
        description: '子分类',
        example: '631030f8fd6bb19182ce4e7d',
    })
    childCategory: string

    @Prop({ required: true })
    @ApiProperty({
        description: '发布消息描述',
        example: '这里是消息描述',
    })
    desc: string

    @Prop({ required: true, max: 6 })
    @ApiProperty({
        description: '消息相关图片',
        example: ['https://cdn-icons-png.flaticon.com/512/7662/7662688.png', 'https://cdn-icons-png.flaticon.com/512/7662/7662688.png'],
    })
    pics: []

    @Prop({ required: true })
    @ApiProperty({
        description: '地址',
        example: '北京市通州区',
    })
    address: string

    @Prop({ required: true })
    @ApiProperty({
        description: '联系人',
        example: '张三',
    })
    contact: string

    @Prop({ required: true })
    @ApiProperty({
        description: '联系人电话',
        example: '18888888888',
    })
    contactPhone: string
}

export const MessageSchema = SchemaFactory.createForClass(Message);


