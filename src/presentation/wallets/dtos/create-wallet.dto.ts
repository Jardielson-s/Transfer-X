import {
  IsString,
  IsOptional,
  IsNotEmpty,
  Length,
  IsUUID,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWallet {
  @ApiProperty({
    description: 'Name of the wallet',
    example: 'Personal Wallet',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the wallet',
    example: 'Wallet to store personal funds',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Wallet number',
    example: '1234567890123456',
  })
  @IsString()
  @IsNotEmpty()
  @Length(16, 16, {
    message: 'Wallet number must be exactly 16 characters long',
  })
  number: string;

  @ApiProperty({
    description: 'Wallet password',
    example: 'secretPassword123',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(6, 20, {
    message: 'Password must be between 6 and 20 characters long',
  })
  password?: string;

  @ApiProperty({
    description: 'User ID owning the wallet',
    example: 'f7a4c6e3-7d9c-45d8-8b19-b4ad2e2b9c78',
  })
  @IsUUID('4', { message: 'User ID must be a valid UUID' })
  @IsNotEmpty()
  userId: string;
}

export class CreateWalletsDto {
  @ApiProperty({
    description: 'List of wallets to create',
    type: [CreateWallet],
    example: [
      {
        name: 'Personal Wallet',
        description: 'Wallet to store personal funds',
        number: '1234567890123456',
        password: 'secretPassword123',
        userId: 'f7a4c6e3-7d9c-45d8-8b19-b4ad2e2b9c78',
      },
      {
        name: 'Business Wallet',
        description: 'Wallet for business operations',
        number: '9876543210987654',
        password: 'businessPassword123',
        userId: 'a1b2c3d4-e5f6-7g8h-9i10-jklmno11',
      },
    ],
  })
  @IsArray()
  wallets: CreateWallet[];
}
