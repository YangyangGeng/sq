import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminModule } from './admin.module';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);

  const config = new DocumentBuilder()
    .setTitle('便民服务站')
    .setDescription('后台管理系统接口')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('admin', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap().then(() => {
  console.log('http://localhost:3000/admin');
});
