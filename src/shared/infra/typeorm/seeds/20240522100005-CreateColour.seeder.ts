import { type Seeder } from 'typeorm-extension';
import { type DataSource } from 'typeorm';

import { Colour } from '../../../../superheroes/colour/entities/Colour';

export default class ColourSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const colourRepository = dataSource.getRepository(Colour);

    await colourRepository.save([
      { id: 1, colour: 'No Colour' },
      { id: 2, colour: 'Amber' },
      { id: 3, colour: 'Auburn' },
      { id: 4, colour: 'Black' },
      { id: 5, colour: 'Black/Blue' },
      { id: 6, colour: 'Blond' },
      { id: 7, colour: 'Blue' },
      { id: 8, colour: 'Blue/White' },
      { id: 9, colour: 'Brown' },
      { id: 10, colour: 'Brown/Black' },
      { id: 11, colour: 'Brown/White' },
      { id: 12, colour: 'Gold' },
      { id: 13, colour: 'Grey' },
      { id: 14, colour: 'Green' },
      { id: 15, colour: 'Green/Blue' },
      { id: 16, colour: 'Hazel' },
      { id: 17, colour: 'Indigo' },
      { id: 18, colour: 'Magenta' },
      { id: 19, colour: 'Orange' },
      { id: 20, colour: 'Orange/White' },
      { id: 21, colour: 'Pink' },
      { id: 22, colour: 'Purple' },
      { id: 23, colour: 'Red' },
      { id: 24, colour: 'Red/Black' },
      { id: 25, colour: 'Red/Grey' },
      { id: 26, colour: 'Red/Orange' },
      { id: 27, colour: 'Red/White' },
      { id: 28, colour: 'Silver' },
      { id: 29, colour: 'Strawberry Blond' },
      { id: 30, colour: 'Violet' },
      { id: 31, colour: 'White' },
      { id: 32, colour: 'White/Red' },
      { id: 33, colour: 'Yellow' },
      { id: 34, colour: 'Yellow/Blue' },
      { id: 35, colour: 'Yellow/Red' },
    ]);
  }
}
