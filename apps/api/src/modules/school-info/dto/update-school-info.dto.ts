import { PartialType } from '@nestjs/swagger';
import { CreateSchoolInfoDto } from './create-school-info.dto';

export class UpdateSchoolInfoDto extends PartialType(CreateSchoolInfoDto) {}
