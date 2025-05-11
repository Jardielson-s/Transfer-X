import { IsArray, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';

export class UpsertUsers {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  data: Array<CreateUserDto>;
}
