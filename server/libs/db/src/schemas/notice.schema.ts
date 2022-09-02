import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Notice extends Document {
    @Prop({ required: true })
    @ApiProperty({
        description: '系统通知内容',
        example: '这个一个banner位',
    })
    message: string;

    @Prop({ required: true, default: 1 })
    @ApiProperty({
        description: '0: 下线 1：上线',
        example: 1,
    })
    status: number

    @Prop({ default: '' })
    @ApiProperty({
        description: '消息关联消息',
        example: '',
    })
    mid?: string
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
