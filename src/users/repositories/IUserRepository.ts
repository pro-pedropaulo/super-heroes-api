import { ActiveUser } from '../dtos/ActiveUserDTO';
import { User } from '../entities/User';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type UserSaveInput = StrictOmit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'generateUuid'
>;

export type UserUpdatePasswordInput = Pick<User, 'id' | 'password'>;

export type UserUpdateInput = StrictOmit<
  User,
  'createdAt' | 'updatedAt' | 'generateUuid'
>;

interface IUserRepository {
  create(data: UserSaveInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByIdAndActive(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailAndNotId(email: string, id: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  updatePassword(data: UserUpdatePasswordInput): Promise<void>;
  update(data: UserUpdateInput): Promise<void>;
  userLoginByEmail(email: string): Promise<User | null>;
  userLoginByCpf(cpf: string): Promise<User | null>;
  delete(id: string): Promise<void>;
  active(data: ActiveUser): Promise<void>;
}

export { IUserRepository };
