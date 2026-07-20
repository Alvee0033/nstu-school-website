import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { NoticesModule } from './modules/notices/notices.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { StaffModule } from './modules/staff/staff.module';
import { StudentsModule } from './modules/students/students.module';
import { ResultsModule } from './modules/results/results.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { AcademicsModule } from './modules/academics/academics.module';
import { UploadModule } from './modules/upload/upload.module';
import { SchoolInfoModule } from './modules/school-info/school-info.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            ttl: config.get<number>('THROTTLE_TTL', 60) * 1000,
            limit: config.get<number>('THROTTLE_LIMIT', 100),
          },
        ],
      }),
    }),

    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        store: redisStore,
        host: config.get('REDIS_HOST', 'localhost'),
        port: config.get<number>('REDIS_PORT', 6379),
        password: config.get('REDIS_PASSWORD'),
        ttl: 300,
      }),
    }),

    PrismaModule,
    AuthModule,
    UsersModule,
    NoticesModule,
    TeachersModule,
    StaffModule,
    StudentsModule,
    ResultsModule,
    GalleryModule,
    AcademicsModule,
    UploadModule,
    SchoolInfoModule,
    HealthModule,
  ],
})
export class AppModule {}
