import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Banner extends Document {
    @Prop({ required: true })
    @ApiProperty({
        description: 'Banner标题',
        example: '这个一个banner位',
    })
    name: string;

    @Prop({ required: true })
    @ApiProperty({
        description: 'Banner图片',
        example: 'https://cdn-icons-png.flaticon.com/512/7662/7662688.png',
    })
    url: string;

    @Prop({ required: true, default: 1 })
    @ApiProperty({
        description: '0: 下线 1：上线',
        example: 0,
    })
    status: number

    @Prop()
    @ApiProperty({
        description: '关联发布消息ID',
        example: '',
    })
    mid: string
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
