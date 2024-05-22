import { type Seeder } from 'typeorm-extension';
import { type DataSource } from 'typeorm';

import { User } from '../../../../users/entities/User';
import { hashPassword } from '../../../util/Password';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    await userRepository.save({
      id: 'b706e86c-3dd5-471b-95cd-1b42fe5c8cd5',
      name: 'teste',
      cpf: '99999999999',
      email: 'teste@teste.com',
      biography: 'biography description',
      password: hashPassword('StandardPassword123!'),
      active: true,
    });
  }
}
