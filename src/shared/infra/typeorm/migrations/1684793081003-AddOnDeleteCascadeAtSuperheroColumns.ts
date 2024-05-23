import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOnDeleteCascadeAtSuperheroColumns1684793082003
  implements MigrationInterface
{
  name = 'AddOnDeleteCascadeAtSuperheroColumns1684793082003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_a0c86f7e12906eb64001a15ecb5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_46970fe24f60b5d921cf758a4b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_1f74ec4f63daad0be9f0c1d1f9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_2046eca8f1a68399ba82a4556d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_3531077b53b3a81bb9c497bf039"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_7e0c912655b9221b48f3bac91ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_172c7f39e3c00b1923ece2f033f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP CONSTRAINT "FK_744de04e162ee8c08feb9fe7c99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_a0c86f7e12906eb64001a15ecb5" FOREIGN KEY ("gender_id") REFERENCES "gender"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_46970fe24f60b5d921cf758a4b7" FOREIGN KEY ("eye_colour_id") REFERENCES "colour"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_1f74ec4f63daad0be9f0c1d1f9c" FOREIGN KEY ("hair_colour_id") REFERENCES "colour"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_2046eca8f1a68399ba82a4556d8" FOREIGN KEY ("skin_colour_id") REFERENCES "colour"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_3531077b53b3a81bb9c497bf039" FOREIGN KEY ("race_id") REFERENCES "race"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_7e0c912655b9221b48f3bac91ce" FOREIGN KEY ("publisher_id") REFERENCES "publisher"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_172c7f39e3c00b1923ece2f033f" FOREIGN KEY ("alignment_id") REFERENCES "alignment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD CONSTRAINT "FK_744de04e162ee8c08feb9fe7c99" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP CONSTRAINT "FK_744de04e162ee8c08feb9fe7c99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_172c7f39e3c00b1923ece2f033f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_7e0c912655b9221b48f3bac91ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_3531077b53b3a81bb9c497bf039"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_2046eca8f1a68399ba82a4556d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_1f74ec4f63daad0be9f0c1d1f9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_46970fe24f60b5d921cf758a4b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_a0c86f7e12906eb64001a15ecb5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD CONSTRAINT "FK_744de04e162ee8c08feb9fe7c99" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_172c7f39e3c00b1923ece2f033f" FOREIGN KEY ("alignment_id") REFERENCES "alignment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_7e0c912655b9221b48f3bac91ce" FOREIGN KEY ("publisher_id") REFERENCES "publisher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_3531077b53b3a81bb9c497bf039" FOREIGN KEY ("race_id") REFERENCES "race"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_2046eca8f1a68399ba82a4556d8" FOREIGN KEY ("skin_colour_id") REFERENCES "colour"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_1f74ec4f63daad0be9f0c1d1f9c" FOREIGN KEY ("hair_colour_id") REFERENCES "colour"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_46970fe24f60b5d921cf758a4b7" FOREIGN KEY ("eye_colour_id") REFERENCES "colour"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_a0c86f7e12906eb64001a15ecb5" FOREIGN KEY ("gender_id") REFERENCES "gender"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
