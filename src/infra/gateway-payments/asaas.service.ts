import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ICustomer } from 'src/shared/inputs/customer.interfcae';
import { pixAddressKeyType, Transfer } from './interfaces/transfer.interface';

@Injectable()
export class AsaasService {
  private baseUrl;
  constructor() {
    this.baseUrl = new axios.Axios({
      baseURL: process.env.ASAAS_SEGURADORA_API_URL,
      headers: {
        'Content-Type': 'application/json',
        access_token: process.env.ASAAS_SEGURADORA_API_TOKEN,
      },
    });
  }

  async createCustomer(input: ICustomer): Promise<string> {
    try {
      const customer = await this.baseUrl.post(
        '/customers',
        JSON.stringify(input),
      );
      return customer?.data?.id;
    } catch (err) {
      throw new BadRequestException('error to create customer');
    }
  }
  async tranferPix(input: {
    value: number;
    pixAddressKey: string;
    pixAddressKeyType: pixAddressKeyType;
    scheduleDate: null;
    description?: string;
  }): Promise<Transfer> {
    try {
      const response = await this.baseUrl.post(
        '/transfers',
        JSON.stringify(input),
      );
      if (response.status === 400) {
        throw new BadRequestException(response.data.description);
      }
      return response.data;
    } catch (error) {
      if (error.message.includes('A chave informada não foi encontrada.')) {
      }
      throw new BadRequestException('error to transfer');
    }
  }
}
