import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

const MONGO_MODELS = MongooseModule.forFeature([
    {
        name: 'USER_MODEL',
        schema: UserSchema,
        collection: 'user'
    }
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