import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransferPix {
  @ApiProperty({
    description: 'Wallet id',
    example: '0fb19490-aeb2-4859-88a9-054fd45153aa',
  })
  @IsString()
  @IsNotEmpty()
  walletId: string;

  @ApiProperty({
    description: 'Pix key',
    example: 'cf35c0d9-d830-4256-b019-1b02936f223f',
  })
  @IsString()
  @IsNotEmpty()
  toKeyPix: string;

  @ApiProperty({
    description: 'Pix type',
    example: 'EVP',
  })
  @IsString()
  @IsNotEmpty()
  pixtype: string;

  @ApiProperty({
    description: 'Pix value',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    description: 'Key description',
    example: 'Para teste',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
