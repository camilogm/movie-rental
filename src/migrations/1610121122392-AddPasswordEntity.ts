import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordEntity1610121122392 implements MigrationInterface {
  name = 'AddPasswordEntity1610121122392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "TokensPassword" ("id" SERIAL NOT NULL, "token" character varying(100) NOT NULL, "createAt" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "REL_b31b080f8ebbb85c0cc8f7ea4e" UNIQUE ("userId"), CONSTRAINT "PK_8593442423777c2c563d294e11f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "TokensPassword" ADD CONSTRAINT "FK_b31b080f8ebbb85c0cc8f7ea4eb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "TokensPassword" DROP CONSTRAINT "FK_b31b080f8ebbb85c0cc8f7ea4eb"`,
    );
    await queryRunner.query(`DROP TABLE "TokensPassword"`);
  }
}
