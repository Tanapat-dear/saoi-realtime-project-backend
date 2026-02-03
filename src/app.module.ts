import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RealtimestatusModule } from './realtimestatus/realtimestatus.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Realtimestatus } from './realtimestatus/entities/realtimestatus.entity';
import { DayjsserviceModule } from './dayjsservice/dayjsservice.module';
import { Outputproduction } from './nouse/outputproduction/entities/outputproduction.entity';
import { WeblayoutModule } from './weblayout/weblayout.module';
import { Weblayout } from './weblayout/entities/weblayout.entity';
import { ProductionModule } from './production/production.module';
import { OeeModule } from './oee/oee.module';
import { CacheModule } from '@nestjs/cache-manager';
import { WipreportModule } from './wipreport/wipreport.module';
import { ProductnameModule } from './productname/productname.module';
import { HttpModule } from '@nestjs/axios';
import { PlaneditorModule } from './planeditor/planeditor.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ManpowerModule } from './manpower/manpower.module';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ทำให้ใช้ได้ทั่วทั้งแอป ไม่ต้อง import ซ้ำ
      envFilePath: '.env', // ระบุ path ของไฟล์ .env (ค่าเริ่มต้นก็คือ .env)
    }),
     TypeOrmModule.forRootAsync({
  name: '10_17_77_118',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: '10.17.77.118',
    port: 5435,
    username: 'postgres',
    password: configService.get<string>('PASSWORD_10_17_77_118'),
    database: configService.get<string>('DB_NAME_10_17_77_118'),
    entities: [Realtimestatus, Outputproduction, Weblayout],
    retryAttempts: 9999999,
    retryDelay: 3000,
  }),
}),
TypeOrmModule.forRootAsync({
  name: '10_17_66_121',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: '10.17.66.121',
    port: 5432,
    username: 'postgres',
    password: configService.get<string>('PASSWORD_10_17_66_121'),
    database: configService.get<string>('DB_NAME_10_17_66_121'),
    entities: [],
    retryAttempts: 999999,
    retryDelay: 3000,
  }),
}),
TypeOrmModule.forRootAsync({
  name: '10_17_66_144',
   inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: '10.17.66.144',
    port: 5432,
    username: 'postgres',
    password: configService.get<string>('PASSWORD_10_17_66_144'),
    database: configService.get<string>('DB_NAME_10_17_66_121'),
    entities: [],
    retryAttempts: 999999,
    retryDelay: 3000,
  }),
}),
   HttpModule,
   CacheModule.register({isGlobal: true,}),
   RealtimestatusModule,
   DayjsserviceModule,
   WeblayoutModule,
   ProductionModule,
   OeeModule,
   WipreportModule,
   ProductnameModule,
   PlaneditorModule,
   AuthModule,
   UsersModule,
   ManpowerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
