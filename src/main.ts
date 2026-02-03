import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
   app.enableCors({
    origin: ['http://localhost:5075', 'http://10.17.77.217:5075','http://localhost:5173','http://10.17.77.118:5075'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // ถ้าใช้ cookie/session
  });
  app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // ตัดฟิลด์ที่ไม่อยู่ใน DTO ทิ้ง
    transform: true, // แปลง JSON เป็น Class DTO อัตโนมัติ
  }));



  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API documentation for SAOI backend service')
    .setVersion('1.0')
  
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  await app.listen(process.env.PORT ?? 5076);
}
bootstrap();
