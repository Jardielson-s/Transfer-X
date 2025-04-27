import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Response,
} from '@nestjs/common';
import { WalletEntity } from '@domain/wallets/entities/wallet.entity';
import { WalletApplicationFactory } from 'src/application/wallets/wallet.application';
import { Response as Res } from 'express';

@Controller('wallets')
export class WalletsController {
  constructor(
    @Inject(WalletApplicationFactory)
    private readonly walletApplicationFactory: WalletApplicationFactory,
  ) {}

  @Post('')
  async create(
    @Response() res: Res,
    @Body() input: Array<Partial<WalletEntity>>,
  ): Promise<object> {
    const data = await this.walletApplicationFactory.createWallet(input);
    return res.json({ message: data });
  }

  @Get(':id')
  async details(@Param('id') id: string): Promise<WalletEntity> {
    return await this.walletApplicationFactory.findById(id);
  }
}
