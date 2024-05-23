import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOnDeleteCascadeAtHeroAttribute1684793082002
  implements MigrationInterface
{
  name = 'AddOnDeleteCascadeAtHeroAttribute1684793082002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP CONSTRAINT "FK_70432687bb53ca0739017820a03"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD CONSTRAINT "FK_70432687bb53ca0739017820a03" FOREIGN KEY ("hero_id") REFERENCES "superhero"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP CONSTRAINT "FK_70432687bb53ca0739017820a03"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD CONSTRAINT "FK_70432687bb53ca0739017820a03" FOREIGN KEY ("hero_id") REFERENCES "superhero"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
