import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop()
    @ApiProperty({
        description: '手机号码',
        example: '13555555555',
    })
    readonly phone: string;

    @Prop()
    @ApiProperty({
        description: '昵称',
        example: '老耿',
    })
    readonly nickname: string;

    @Prop()
    @ApiProperty({
        description: '登录密码',
        example: '123456'
    })
    readonly password: string;

    @Prop()
    readonly salt?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);