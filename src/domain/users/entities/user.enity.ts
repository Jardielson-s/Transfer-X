import { IEntity } from '@domain/interfaces/entity';

export class UserEntity implements IEntity {
  id: string;
  name: string;
  ein: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(input: Partial<UserEntity>) {
    Object.assign(this, input);
  }
}
