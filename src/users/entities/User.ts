import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../shared/infra/typeorm/entities/AbstractEntity';

@Entity('users')
export class User extends AbstractEntity {
  @Column({ unique: true })
  cpf: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'profile_photo', nullable: true })
  profilePhoto: string;

  @Column({ length: 500 })
  biography: string;

  @Column({ select: false })
  password: string;
}
