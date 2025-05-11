import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class QueryUserDto {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'User id',
    example: '6a761ad1-d5de-4298-9ed7-b38e3a775ba6',
  })
  @IsOptional()
  @IsUUID()
  id: string;

  @ApiProperty({
    type: String,
    name: 'ein',
    description: 'User ein',
    example: '6a761ad1-d5de-4298-9ed7-b38e3a775ba6',
  })
  @IsOptional()
  @IsString()
  ein: string;
}
