import { type Seeder } from 'typeorm-extension';
import { type DataSource } from 'typeorm';

import { Publisher } from '../../../../superheroes/publisher/entities/Publisher';

export default class PublisherSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const publisherRepository = dataSource.getRepository(Publisher);

    await publisherRepository.save([
      { id: 1, publisher: '' },
      { id: 2, publisher: 'ABC Studios' },
      { id: 3, publisher: 'Dark Horse Comics' },
      { id: 4, publisher: 'DC Comics' },
      { id: 5, publisher: 'George Lucas' },
      { id: 6, publisher: 'Hanna-Barbera' },
      { id: 7, publisher: 'HarperCollins' },
      { id: 8, publisher: 'Icon Comics' },
      { id: 9, publisher: 'IDW Publishing' },
      { id: 10, publisher: 'Image Comics' },
      { id: 11, publisher: 'J. K. Rowling' },
      { id: 12, publisher: 'J. R. R. Tolkien' },
      { id: 13, publisher: 'Marvel Comics' },
      { id: 14, publisher: 'Microsoft' },
      { id: 15, publisher: 'NBC - Heroes' },
      { id: 16, publisher: 'Rebellion' },
      { id: 17, publisher: 'Shueisha' },
      { id: 18, publisher: 'Sony Pictures' },
      { id: 19, publisher: 'South Park' },
      { id: 20, publisher: 'Star Trek' },
      { id: 21, publisher: 'SyFy' },
      { id: 22, publisher: 'Team Epic TV' },
      { id: 23, publisher: 'Titan Books' },
      { id: 24, publisher: 'Universal Studios' },
      { id: 25, publisher: 'Wildstorm' },
    ]);
  }
}
