import { type Seeder } from 'typeorm-extension';
import { type DataSource } from 'typeorm';

import { Alignment } from '../../../../superheroes/alignment/entities/Alignment';

export default class AlignmentSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const alignmentRepository = dataSource.getRepository(Alignment);

    await alignmentRepository.save([
      { id: 1, alignment: 'Good' },
      { id: 2, alignment: 'Bad' },
      { id: 3, alignment: 'Neutral' },
      { id: 4, alignment: 'N/A' },
    ]);
  }
}
