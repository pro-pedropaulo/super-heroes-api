import { type Seeder } from 'typeorm-extension';
import { type DataSource } from 'typeorm';

import { Attribute } from '../../../../superheroes/attribute/entities/Attribute';

export default class AttributeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const attributeRepository = dataSource.getRepository(Attribute);

    await attributeRepository.save([
      { id: 1, attributeName: 'Intelligence' },
      { id: 2, attributeName: 'Strength' },
      { id: 3, attributeName: 'Speed' },
      { id: 4, attributeName: 'Durability' },
      { id: 5, attributeName: 'Power' },
      { id: 6, attributeName: 'Combat' },
    ]);
  }
}
