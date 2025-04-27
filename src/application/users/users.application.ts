import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'domain/users/entities/user.entity';
import { CreateUserUseCase } from 'domain/users/use-cases/create-user/create-user.use-case';
import { AsaasService } from 'infra/gateway-payments/asaas.service';
import { UserRepository } from 'infra/repositories/users/users.repository';

@Injectable()
export class UserApplicationFactory {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(AsaasService)
    private readonly asaasService: AsaasService,
  ) {}

  async createUser(input: Partial<UserEntity>): Promise<void> {
    try {
      const emailAlreadyExists = await this.userRepository.findByEmail(
        input.email,
      );
      if (emailAlreadyExists) {
        throw new BadRequestException('Email already exists');
      }
      const einAlreadyExists = await this.userRepository.findByEin(input.ein);
      if (einAlreadyExists) {
        throw new BadRequestException('Ein already exists');
      }

      const userExternalId = await this.asaasService.createCustomer({
        ...input,
        cpfCnpj: input.ein,
      });
      input.externalUserId = userExternalId;
      await this.createUserUseCase.execute(input);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
