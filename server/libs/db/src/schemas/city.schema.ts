import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class City extends Document {
    @Prop()
    @ApiProperty({
        description: '城市名称',
        example: '周口',
    })
    name: string;

    @Prop()
    @ApiProperty({
        description: '城市首拼音字母',
        example: 'A',
    })
    preChar: string;

    @Prop({ required: true, default: 0 })
    @ApiProperty({
        description: '是否删除',
        example: 0,
    })
    isDel: number

    @Prop({ default: '' })
    @ApiProperty({
        description: '上级城市ID',
        example: ''
    })
    pcid?: string;
}

export const CitySchema = SchemaFactory.createForClass(City);