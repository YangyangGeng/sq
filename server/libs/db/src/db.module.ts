import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { CategorySchema } from './schemas/category.schema';
import { BannerSchema } from './schemas/banner.schema';
import { NoticeSchema } from './schemas/notice.schema';
import { CustomerSchema } from './schemas/customer.schema';
import { CitySchema } from './schemas/city.schema';

const MONGO_MODELS = MongooseModule.forFeature([
    { name: 'USER_MODEL', schema: UserSchema, collection: 'user' },
    { name: 'CATEGORY_MODEL', schema: CategorySchema, collection: 'category' },
    { name: 'BANNER_MODEL', schema: BannerSchema, collection: 'banner' },
    { name: 'NOTICE_MODEL', schema: NoticeSchema, collection: 'notice' },
    { name: 'CUSTOMER_MODEL', schema: CustomerSchema, collection: 'customer' },
    { name: 'CITY_MODEL', schema: CitySchema, collection: 'city' },
])

@Global()
@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/sq', {
        }),
        MONGO_MODELS,
    ],
    // eslint-disable-next-line prettier/prettier
    providers: [DbService],
    exports: [DbService, MONGO_MODELS],
})
export class DbModule {}
