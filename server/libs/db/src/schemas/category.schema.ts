import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
    @Prop({ required: true })
    @ApiProperty({
        description: '分类名称',
        example: '结婚交友',
    })
    name: string;

    @Prop({ required: true })
    @ApiProperty({
        description: '分类图片',
        example: 'https://cdn-icons-png.flaticon.com/512/7662/7662688.png',
    })
    url: string;

    @Prop({ required: true, default: 1 })
    @ApiProperty({
        description: '0: 下线 1：上线',
        example: 0,
    })
    status: number

    @Prop({ required: true, default: 0 })
    @ApiProperty({
        description: '是否删除',
        example: 0,
    })
    isDel: number

    @Prop({ default: '' })
    @ApiProperty({
        description: 'PID',
        example: '',
    })
    pid?: string
}

export const CategorySchema = SchemaFactory.createForClass(Category);
