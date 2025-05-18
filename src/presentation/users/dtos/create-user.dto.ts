import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User ein',
    example: '50730577082',
  })
  @IsNotEmpty()
  @IsString()
  ein: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John joe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @ApiProperty({
    description: 'User phone',
    example: '+55 11 91234-5678',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'User postalcode',
    example: '12345-678',
  })
  @IsString()
  @Matches(/^\d{5}-\d{3}$/, {
    message: 'Postal code must be in the format XXXXX-XXX',
  })
  postalCode: string;

  @ApiProperty({
    description: 'User address',
    example: 'Rua das Flores',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'User address number',
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  addressNumber: string;

  @ApiProperty({
    description: 'Complemento do endereço',
    example: 'Apto 101',
    required: false,
  })
  @IsString()
  @IsOptional()
  complement: string;

  @ApiProperty({
    description: 'city',
    example: 'São Paulo',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'Country',
    example: 'Brasil',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'User another application',
    example: 'objectId',
  })
  @IsString()
  @IsOptional()
  externalUserId?: string;
}
