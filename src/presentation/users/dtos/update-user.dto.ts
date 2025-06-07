import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User id',
    example: '6a761ad1-d5de-4298-9ed7-b38e3a775ba6',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'User ein',
    example: '50730577082',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  ein: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John joe',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @ApiProperty({
    description: 'User phone',
    example: '+55 11 91234-5678',
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'User postalcode',
    example: '12345-678',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{5}-\d{3}$/, {
    message: 'Postal code must be in the format XXXXX-XXX',
  })
  postalCode: string;

  @ApiProperty({
    description: 'User address',
    example: 'Rua das Flores',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'User address number',
    example: '123',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  addressNumber: string;

  @ApiProperty({
    description: 'Complemento do endereço',
    example: 'Apto 101',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  complement: string;

  @ApiProperty({
    description: 'city',
    example: 'São Paulo',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'Country',
    example: 'Brasil',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsOptional()
  integrationId: string;
}
