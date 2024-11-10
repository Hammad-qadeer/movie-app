import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Movies API')
    .setDescription('The movies API')
    .setVersion('1.0')
    .addTag('movies')
    .build();

  const app = await NestFactory.create(AppModule, { cors: true });

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  app.enableCors();
}
bootstrap();
