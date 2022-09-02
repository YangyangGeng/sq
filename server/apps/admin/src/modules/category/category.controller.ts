import { Category } from '@libs/db/schemas/category.schema';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@Controller('category')
@ApiTags('发布信息分类模块')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @Get('list')
    @ApiOperation({
        summary: '获取分类列表'
    })
    public async list() {
        return await this.categoryService.list();
    }

    @Post('create')
    @ApiOperation({
        summary: '添加分类'
    })
    public async create(@Body() categoryDto: Category) {
        return await this.categoryService.create(categoryDto);
    }

    @Delete('delete/:id')
    @ApiOperation({
        summary: '删除分类'
    })
    public async delete(@Param('id') id: string) {
        return await this.categoryService.delete(id);
    }

    @Put('update/:id')
    @ApiOperation({
        summary: '修改分类'
    })
    public async update(@Body() categoryDto: Category, @Param('id') id: string) {
        return await this.categoryService.update(categoryDto, id);
    }
}
