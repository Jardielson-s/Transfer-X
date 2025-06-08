import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { pixAddressKeyType, Transfer } from './interfaces/transfer.interface';
import { ICustomer } from 'shared/inputs/customer.interface';
import { ConfigEnvs } from 'config/env';

@Injectable()
export class AsaasService {
  private baseUrl;
  constructor() {
    this.baseUrl = new axios.Axios({
      baseURL: ConfigEnvs.asaas.API_URL,
      headers: {
        'Content-Type': 'application/json',
        access_token: ConfigEnvs.asaas.API_TOKEN,
      },
    });
  }

  async createCustomer(input: Partial<ICustomer>): Promise<string> {
    try {
      const customer = await this.baseUrl.post(
        '/customers',
        JSON.stringify(input),
      );
      console.log(customer);
      if (customer.status === 400) {
        JSON.parse(customer.data)?.errors[0]?.description;
      }
      return JSON.parse(customer?.data)?.id;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
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
        JSON.parse(response.data)?.errors[0]?.description;
      }
      return response.data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createPix(type: pixAddressKeyType): Promise<string> {
    try {
      const response = await this.baseUrl.post(
        '/pix/addressKeys',
        JSON.stringify({ type }),
      );
      if (response.status === 400) {
        throw new BadRequestException(
          JSON.parse(response.data)?.errors[0]?.description,
        );
      }
      return JSON.parse(response.data)?.key;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
