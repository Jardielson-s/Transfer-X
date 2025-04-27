import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Response,
} from '@nestjs/common';
import { WalletApplicationFactory } from 'application/wallets/wallet.application';
import { WalletEntity } from 'domain/wallets/entities/wallet.entity';
import { Response as Res } from 'express';
import { CreateWalletsDto } from '../dtos/create-wallet.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateTransferPix } from '../dtos/create-transfer-pix.dto';

@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(
    @Inject(WalletApplicationFactory)
    private readonly walletApplicationFactory: WalletApplicationFactory,
  ) {}

  @Post('')
  async create(
    @Response() res: Res,
    @Body() input: CreateWalletsDto,
  ): Promise<object> {
    const data = await this.walletApplicationFactory.createWallet(
      input.wallets,
    );
    return res.json({ message: data });
  }

  @Get(':id')
  async details(@Param('id') id: string): Promise<WalletEntity> {
    return await this.walletApplicationFactory.findById(id);
  }

  @Post('/transfer-pix')
  async transferPix(
    @Response() res: Res,
    @Body() input: CreateTransferPix,
  ): Promise<object> {
    const data = await this.walletApplicationFactory.transferPix(input);
    return res.json({ message: data });
  }
}
