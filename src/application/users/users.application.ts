import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'domain/users/entities/user.entity';
import { CreateUserUseCase } from 'domain/users/use-cases/create-user/create-user.use-case';
import { UpdateUserUseCase } from 'domain/users/use-cases/update-user/update-user.use-case';
import { UpsertUserUseCase } from 'domain/users/use-cases/upsert-users/upsert-users.use-case';
import { AsaasService } from 'infra/gateway-payments/asaas.service';
import { UserRepository } from 'infra/repositories/users/users.repository';
import { Not } from 'typeorm';

@Injectable()
export class UserApplicationFactory {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(UpdateUserUseCase)
    private readonly updateUserUseCase: UpdateUserUseCase,
    @Inject(UpsertUserUseCase)
    private readonly upsertUserUseCase: UpsertUserUseCase,
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

  async updateUser(input: Partial<UserEntity>): Promise<void> {
    try {
      try {
        const emailAlreadyExists = await this.userRepository.findByEmail(
          input.email,
          {
            id: Not(input.id),
          },
        );
        if (emailAlreadyExists) {
          throw new BadRequestException('Email already exists');
        }
        const einAlreadyExists = await this.userRepository.findByEin(
          input.ein,
          {
            id: Not(input.id),
          },
        );
        if (einAlreadyExists) {
          throw new BadRequestException('Ein already exists');
        }
        await this.updateUserUseCase.execute(input);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async upsertUsers(data: Partial<UserEntity>[]): Promise<{
    errors: object;
    upsert: object;
  }> {
    try {
      try {
        const errors: Array<{ message: string; entity: Partial<UserEntity> }> =
          [];
        const upsert: Array<Partial<UserEntity>> = [];
        await Promise.all(
          data.map(async (input) => {
            const emailAlreadyExists = await this.userRepository.findByEmail(
              input.email,
              {
                ...(input?.id ? { id: Not(input?.id) } : {}),
              },
            );
            if (emailAlreadyExists) {
              errors.push({
                message: 'Email already exists',
                entity: input,
              });
              return;
            }
            const einAlreadyExists = await this.userRepository.findByEin(
              input.ein,
              {
                ...(input?.id ? { id: Not(input?.id) } : {}),
              },
            );
            if (einAlreadyExists) {
              errors.push({
                message: 'Ein already exists',
                entity: input,
              });
              return;
            }
            const userExternalId = await this.asaasService.createCustomer({
              ...input,
              cpfCnpj: input.ein,
            });
            input.externalUserId = userExternalId;
            upsert.push(input);
          }),
        );

        if (upsert.length) {
          await this.upsertUserUseCase.execute(upsert);
        }
        return { errors, upsert };
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(query: object): Promise<Array<UserEntity>> {
    try {
      return this.userRepository.find(query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
