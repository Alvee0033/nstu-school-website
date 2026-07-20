import { Module } from '@nestjs/common';
import { SchoolInfoService } from './school-info.service';
import { SchoolInfoController } from './school-info.controller';

@Module({
  providers: [SchoolInfoService],
  controllers: [SchoolInfoController],
})
export class SchoolInfoModule {}
