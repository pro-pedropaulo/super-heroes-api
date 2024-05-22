import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1684793082000 implements MigrationInterface {
  name = 'CreateUserTable1684793082000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" character varying(36) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "cpf" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "profile_photo" character varying, "biography" character varying(500) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_230b925048540454c8b4c481e1d1" UNIQUE ("cpf"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be4" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7434" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
