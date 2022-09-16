import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { ICategoryTag } from '../interface/respones.interface';

@Schema({ timestamps: true })
export class Message extends Document {
    @Prop({ required: true })
    @ApiProperty({
        description: '用户微信授权ID',
        example: 'oIhPF5P8CcE6sa07uEaC9BQZ985M',
    })
    openid: string;

    @Prop({ required: true, default: 2 })
    @ApiProperty({
        description: '0: 下线 1：上线 2：审核中',
        example: 2,
    })
    status: number

    @Prop({ required: true })
    @ApiProperty({
        description: '分类ID',
        example: '63102ee7fd6bb19182ce4e73',
    })
    pcid: string

    @Prop({ type: Object, required: true })
    @ApiProperty({
        description: '子分类ID',
        example: {
            _id: '631030f8fd6bb19182ce4e7d',
            name: '交友'
        },
    })
    category: ICategoryTag

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
    address: ''

    @Prop({ required: true })
    @ApiProperty({
        description: '联系人',
        example: '张三',
    })
    contact: ''

    @Prop({ required: true })
    @ApiProperty({
        description: '联系人电话',
        example: '18888888888',
    })
    contactPhone: ''
}

export const MessageSchema = SchemaFactory.createForClass(Message);
