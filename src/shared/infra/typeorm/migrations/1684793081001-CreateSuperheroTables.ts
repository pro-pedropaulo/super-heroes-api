import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSuperheroTables1684793082001 implements MigrationInterface {
  name = 'CreateSuperheroTables1684793082001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gender" ("id" SERIAL NOT NULL, "gender" character varying NOT NULL, CONSTRAINT "PK_98a711129bc073e6312d08364e9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "colour" ("id" SERIAL NOT NULL, "colour" character varying NOT NULL, CONSTRAINT "PK_04e2f7f25e4de91d3b0ec96443e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "race" ("id" SERIAL NOT NULL, "race" character varying NOT NULL, CONSTRAINT "PK_a3068b184130d87a20e516045bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "publisher" ("id" SERIAL NOT NULL, "publisher" character varying NOT NULL, CONSTRAINT "PK_70a5936b43177f76161724da3e7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "alignment" ("id" SERIAL NOT NULL, "alignment" character varying NOT NULL, CONSTRAINT "PK_6d3449aed4bfee0b1d4b9b62e21" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "superpower" ("id" SERIAL NOT NULL, "power_name" character varying NOT NULL, CONSTRAINT "PK_fa3edbd7a16307c13bba08b1b0b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "superhero" ("id" SERIAL NOT NULL, "superhero_name" character varying NOT NULL, "full_name" character varying NOT NULL, "height_cm" integer NOT NULL, "weight_kg" integer NOT NULL, "gender_id" integer, "eye_colour_id" integer, "hair_colour_id" integer, "skin_colour_id" integer, "race_id" integer, "publisher_id" integer, "alignment_id" integer, CONSTRAINT "PK_b92ff773465116c2b5e215bb911" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "attribute" ("id" SERIAL NOT NULL, "attribute_name" character varying NOT NULL, CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de730" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hero_attribute" ("id" SERIAL NOT NULL, "attribute_value" integer NOT NULL, "hero_id" integer, "attribute_id" integer, CONSTRAINT "PK_695e9101d6bfd86621ee2fa3354" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hero_power" ("hero_id" integer NOT NULL, "power_id" integer NOT NULL, CONSTRAINT "PK_b4fc65340fc2fbfd004a6b8568a" PRIMARY KEY ("hero_id", "power_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6c16dd14b676d836e4bfbb3b83" ON "hero_power" ("hero_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1df29ffd85077771b740901ff5" ON "hero_power" ("power_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_a0c86f7e12906eb64001a15ecb5" FOREIGN KEY ("gender_id") REFERENCES "gender"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_46970fe24f60b5d921cf758a4b7" FOREIGN KEY ("eye_colour_id") REFERENCES "colour"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_1f74ec4f63daad0be9f0c1d1f9c" FOREIGN KEY ("hair_colour_id") REFERENCES "colour"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_2046eca8f1a68399ba82a4556d8" FOREIGN KEY ("skin_colour_id") REFERENCES "colour"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_3531077b53b3a81bb9c497bf039" FOREIGN KEY ("race_id") REFERENCES "race"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_7e0c912655b9221b48f3bac91ce" FOREIGN KEY ("publisher_id") REFERENCES "publisher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_172c7f39e3c00b1923ece2f033f" FOREIGN KEY ("alignment_id") REFERENCES "alignment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD CONSTRAINT "FK_70432687bb53ca0739017820a03" FOREIGN KEY ("hero_id") REFERENCES "superhero"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD CONSTRAINT "FK_744de04e162ee8c08feb9fe7c99" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" ADD CONSTRAINT "FK_6c16dd14b676d836e4bfbb3b823" FOREIGN KEY ("hero_id") REFERENCES "superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" ADD CONSTRAINT "FK_1df29ffd85077771b740901ff44" FOREIGN KEY ("power_id") REFERENCES "superpower"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hero_power" DROP CONSTRAINT "FK_1df29ffd85077771b740901ff44"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" DROP CONSTRAINT "FK_6c16dd14b676d836e4bfbb3b823"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP CONSTRAINT "FK_744de04e162ee8c08feb9fe7c99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP CONSTRAINT "FK_70432687bb53ca0739017820a03"`,
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
      `DROP INDEX "public"."IDX_1df29ffd85077771b740901ff5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6c16dd14b676d836e4bfbb3b83"`,
    );
    await queryRunner.query(`DROP TABLE "hero_power"`);
    await queryRunner.query(`DROP TABLE "hero_attribute"`);
    await queryRunner.query(`DROP TABLE "attribute"`);
    await queryRunner.query(`DROP TABLE "superhero"`);
    await queryRunner.query(`DROP TABLE "superpower"`);
    await queryRunner.query(`DROP TABLE "alignment"`);
    await queryRunner.query(`DROP TABLE "publisher"`);
    await queryRunner.query(`DROP TABLE "race"`);
    await queryRunner.query(`DROP TABLE "colour"`);
    await queryRunner.query(`DROP TABLE "gender"`);
  }
}
