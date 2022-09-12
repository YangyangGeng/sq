import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Customer extends Document {
    @Prop()
    @ApiProperty({
        description: '微信授权openid',
        example: '112233',
    })
    openid: string;

    @Prop({ default: false })
    @ApiProperty({
        description: '是否删除',
        example: false,
    })
    isDelete?: false;

    @Prop()
    @ApiProperty({
        description: '昵称',
        example: '大恒',
    })
    nickName: string;

    @Prop()
    @ApiProperty({
        description: '用户头像',
        example: '大恒',
    })
    avatar: string;

    @Prop()
    @ApiProperty({
        description: '用户性别',
        example: 1
    })
    gender: number;

    @Prop({ default: null })
    @ApiProperty({
        description: '用户手机',
        example: '13581623348'
    })
    phone?: string;

    @Prop()
    @ApiProperty({
        description: '用户手机唯一ID',
        example: '112233'
    })
    appid: string;

    @Prop({ default: null })
    salt?: string;

    @Prop({ default: null })
    token?: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);


export class Login {
    readonly iv: string;
    readonly encryptedData: string;
    readonly code: string;
}