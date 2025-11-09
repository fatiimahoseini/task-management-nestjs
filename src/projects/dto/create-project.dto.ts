import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import ProjectStatusEnum from '../enums/projectStatusEnum';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(ProjectStatusEnum)
  status: ProjectStatusEnum;
}
