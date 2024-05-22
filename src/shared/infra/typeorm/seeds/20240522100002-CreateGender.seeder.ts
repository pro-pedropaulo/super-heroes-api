import { type Seeder } from 'typeorm-extension';
import { type DataSource } from 'typeorm';

import { Gender } from '../../../../superheroes/gender/entities/Gender';

export default class GenderSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const genderRepository = dataSource.getRepository(Gender);

    await genderRepository.save([
      { id: 1, gender: 'Male' },
      { id: 2, gender: 'Female' },
      { id: 3, gender: 'N/A' },
    ]);
  }
}
